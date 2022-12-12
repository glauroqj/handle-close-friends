import { createGlobalStyle } from 'styled-components'
import { createTheme } from '@mui/material/styles'
import commonGlobalStyle from './global'

const Breakpoints = {
  xs: '640px',
  sm: '830px',
  md: '1100px',
  lg: '1500px'
}
const Colors = {
  primary: '#56a0d3',
  primary_light: '#82CDFF',
  primary_dark: '#2A6287',
  secondary: '#2F3640',
  secondary_light: '#66768C',
  secondary_dark: '#252B33',
  gray: '#dfe6e9',
  gray_15: '#bdc3c7',
  gray_50: '#636e72',
  light: '#ffffff',
  dark: '#2c2b2b',
  facebook: '#3b5998',
  success: '#4caf50',
  success_dark: '#388e3c',
  error: '#d63031',
  warning: '#f1c40f',
  info: '#74b9ff',
  loading: '#3498db'
}

const Spaces = {
  0: '0',
  4: '4px',
  8: '8px',
  16: '16px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px'
}

const Fonts = {
  default: 'Roboto, sans-serif',
  secondary: 'Open Sans, sans-serif'
}
const FontSize = {
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  24: '24px',
  32: '32px'
}
const FontWeight = {
  light: 300,
  normal: 400,
  medium: 600,
  bold: 700
}
const Titles = {
  h1: `
    font-family: ${Fonts.default};
    font-weight: ${FontWeight.normal};
    font-size: ${FontSize.lg};
  `,
  h2: `
    font-family: ${Fonts.default};
    font-weight: ${FontWeight.normal};
    font-size: ${FontSize.md};
  `,
  h3: `
    font-family: ${Fonts.default};
    font-weight: ${FontWeight.normal};
    font-size: ${FontSize.sm};
  `,
  paragraph: ``
}


/** THEME */
export const Theme = {
  space: Spaces,
  breakpoint: Breakpoints,
  color: Colors,
  typography: {
    fontFamily: Fonts,
    fontSize: FontSize,
    fontWeight: FontWeight,
    ...Titles
  }
}

/** MATERIAL THEME */
export const MaterialTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: Colors.primary_light,
      main: Colors.primary,
      dark: Colors.primary_dark
    },
    secondary: {
      light: Colors.secondary_light,
      main: Colors.secondary,
      dark: Colors.secondary_dark
    }
  },
  typography: {
    fontFamily: ['"Roboto"', '"sans-serif"'].join(','),
    h2: {
      color: Colors.gray_50
    },
    subtitle1: {
      color: Colors.gray_50
    }
  },
  components: {
  },
})

/** GLOBAL */
export const GlobalStyle = createGlobalStyle`${commonGlobalStyle(Breakpoints, Colors, Spaces, Fonts)}`