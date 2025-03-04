import { createTheme } from '@mui/material/styles'

import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'

export const theme = createTheme({
  components,
  palette,
  spacing: (factor: number) => `${0.5 * factor}rem`,
  typography,
})
