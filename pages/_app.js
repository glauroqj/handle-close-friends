/* eslint-disable react/react-in-jsx-scope */
/** MAIN FILE */
/** next */
import Head from 'next/head'
/** theme */
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { GlobalStyle, Theme, MaterialTheme } from 'assets/theme'
/** material theme */
import { ThemeProvider as MaterialProvider } from '@mui/material/styles'
// /** polyfill */
// import 'abortcontroller-polyfill'
// /** logs */
// import sentryInit from 'utils/sentry'
// sentryInit()
/** firebase */
import firebaseStart from 'infra/firebase/config'

const App = ({ Component, pageProps }) => {
  firebaseStart()

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=0" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#f0932b" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Reset />
      <GlobalStyle />

      <ThemeProvider theme={Theme}>
        <MaterialProvider theme={MaterialTheme}>
          <Component {...pageProps} />
        </MaterialProvider>
      </ThemeProvider>

    </>
  )
}

export default App