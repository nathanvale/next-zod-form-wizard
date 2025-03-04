import { Lato } from 'next/font/google'

export const lato = Lato({
  display: 'swap',
  subsets: ['latin'],
  weight: [
    '100',
    '300', // fontWeightLight
    '400', // fontWeightRegular
    '700', // fontWeightMedium
    '900', // fontWeightBold
  ],
})
