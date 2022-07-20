import React from 'react'
import { Icon, createIcon } from '@chakra-ui/react'

export const EthIcon = createIcon({
  displayName: 'EthIcon',
  viewBox: '0 0 33 53',
  width: '33',
  height: '53',

  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: [
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.3576 0.666687L16.0095 1.85009V36.1896L16.3576 36.5371L32.2976 27.115L16.3576 0.666687Z"
      fill="#343434"
    />,
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.3578 0.666687L0.417816 27.115L16.3578 36.5372V19.8699V0.666687Z"
      fill="#8C8C8C"
    />,
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.3575 39.5552L16.1613 39.7944V52.0268L16.3575 52.6L32.307 30.1378L16.3575 39.5552Z"
      fill="#3C3C3B"
    />,
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.3578 52.5998V39.5551L0.417816 30.1377L16.3578 52.5998Z"
      fill="#8C8C8C"
    />,
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.3575 36.537L32.2973 27.1151L16.3575 19.8699V36.537Z"
      fill="#141414"
    />,
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M0.417816 27.1151L16.3576 36.537V19.8699L0.417816 27.1151Z"
      fill="#393939"
    />,
  ],
})
