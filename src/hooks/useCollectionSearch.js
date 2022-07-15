// www.youtube.com/watch?v=NZKUirTtxcg

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  createSearchCollectionConfig,
  createTraitsConfig,
  createTokensConfig,
  createCollectionInfoConfig,
  getTokenMetadataApi,
  normaliseNftData,
} from '../utils/api.js'

export default function useCollectionSearch(
  query,
  selectedCollection,
  pageNumber,
  selectedTraits
) {
  const [loading, setLoading] = useState({}) // change loading to an object
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [data, setData] = useState({})

  // Reset nfts array when a new collection is selected
  useEffect(() => {
    setData({})
    setError(null)
    setLoading({})
    setHasMore(null)
  }, [selectedCollection])

  // Search for collections

  useEffect(() => {
    console.log('---------------------')
    console.log('collection search useEffect triggered')
    console.log('---------------------')
    const abortController = new AbortController()

    if (query === '') {
      setData((prevData) => ({ ...prevData, collectionSearch: null }))
      setLoading((prev) => ({ ...prev, search: false }))
      setError(null)
      return
    }

    async function searchCollections() {
      setLoading((prev) => ({ ...prev, search: true }))
      setError(null)

      let config = createSearchCollectionConfig(query, {
        signal: abortController.signal,
      })

      const data = await axios(config).then((res) => res.data)
      console.log('--- search collections', data)
      setData((prevData) => ({ ...prevData, collectionSearch: data }))
    }

    searchCollections()
      .catch((error) => {
        if (error.name === 'CanceledError') return
        console.log(error)
        setError('The request failed. Please try again later.')
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, search: false }))
      })

    return () => abortController.abort()
  }, [query])

  useEffect(() => {
    console.log('---------------------')
    console.log('selected useEffect triggered')
    console.log('---------------------')
    if (selectedCollection.address === '' || !selectedCollection.address) return // ignore the first render

    const abortController = new AbortController()
    let contractAddress = selectedCollection.address
    let offset = 0

    let nftsConfig = createTokensConfig([], contractAddress, offset, {
      signal: abortController.signal,
    })
    let traitsConfig = createTraitsConfig(contractAddress)
    let collectionInfoConfig = createCollectionInfoConfig(contractAddress)
    const endpoints = [nftsConfig, traitsConfig, collectionInfoConfig]

    setLoading((prev) => ({ ...prev, nfts: true }))
    setError(null)

    Promise.all(endpoints.map((endpoint) => axios(endpoint)))
      .then(([tokensRes, traitsRes, infoRes]) => {
        console.log('collection nfts:', tokensRes)
        console.log('collection traits:', traitsRes)
        console.log('collection info:', infoRes)

        setData((prevData) => ({
          ...prevData,
          collectionTraits: traitsRes.data,
          collectionInfo: infoRes.data,
        }))

        return tokensRes.data
      })
      .then((tokens) => {
        setData((prev) => ({ ...prev, collectionNftStats: tokens }))
        setHasMore(tokens.tokenCountLeft > 0)
        if (tokens.count > 0) {
          return getTokenMetadataApi(tokens, contractAddress)
        } else {
          setError('No nfts found :(')
          throw 'No nfts found :('
        }
      })
      .then((metadata) => {
        setData((prev) => ({
          ...prev,
          collectionNfts: [...normaliseNftData(metadata)],
        }))

        console.log(normaliseNftData(metadata))
      })
      .catch((error) => {
        if (error.name === 'CanceledError') return
        console.log(error)
        setError(error)
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, nfts: false }))
      })

    return () => abortController.abort()
  }, [selectedCollection])

  return {
    loading,
    error,
    hasMore,
    data,
  }
}
