import { createTheme, Theme } from '@mui/material/styles'

const defaultTheme = createTheme()

export const palette: Theme['palette'] = {
  ...defaultTheme.palette,
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  common: { black: '#000', white: '#fff' },
  divider: 'rgba(0, 0, 0, 0.12)',
  error: {
    contrastText: '#ffffff',
    dark: '#C62828',
    light: '#EF5350',
    main: '#D32F2F',
  },
  info: {
    contrastText: '#ffffff',
    dark: '#01579B',
    light: '#03A9F4',
    main: '#0288D1',
  },
  primary: {
    contrastText: '#ffffff',
    dark: '#313131',
    light: '#B6C1BA',
    main: '#00303C',
  },
  secondary: {
    contrastText: '#FFFFFF',
    dark: '#0C233F',
    light: '#C1E2E8',
    main: '#E7ECEB',
  },
  success: {
    contrastText: '#ffffff',
    dark: '#1B5E20',
    light: '#76BD22',
    main: '#2E7D32',
  },
  text: {
    disabled: '#00000061',
    primary: '#000000',
    secondary: 'rgba(0, 0, 0, 0.60)',
  },
  warning: {
    contrastText: '#ffffff',
    dark: '#E65100',
    light: '#FF9800',
    main: '#EF6C00',
  },
}
