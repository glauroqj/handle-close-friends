/* eslint-disable require-jsdoc */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
/** ssr material themes */
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="google-site-verification" content="w9RfTUwtkWXQs4phg3l3wWle0PR2xJC_x4wWiu2VOwc" />
          <meta name="facebook-domain-verification" content="9un7aeeicv0pm52x0lysfkj0ummvc8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />

          <link
            rel="preload"
            as='style'
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap"
            onLoad="this.media='all'"
          />

          {/** service worker */}
          {/* {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'development' && (
            <script dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {

                  window.addEventListener('load', async () => {
                    navigator.serviceWorker.register(
                      '/service-worker.js',
                      {scope: '/'}
                    )
                    .then(registration => {
                      console.log('< SERVICE WORKER : DONE > ', registration)
                      if (registration?.waiting) {
                        registration.waiting.postMessage('SKIP_WAITING')
                      }
                    })
                    .catch(error => console.warn('< SERVICE WORKER : ERROR > ', error))

                  })

                }
              `
            }} />
          )} */}

        </Head>

        <body>
          <Main />
          <NextScript />

          <script dangerouslySetInnerHTML={{
            __html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '619394426458595',
                xfbml      : true,
                version    : 'v15.0'
              });
              FB.AppEvents.logPageView();
            };
          
            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
              `
          }} />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {

  // Render app and page and get the context of the page with collected side effects.
  // const sheet = new ServerStyleSheet()
  const styledComponentSheet = new StyledComponentSheets()
  const materialUiSheets = new MaterialUiServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentSheet.collectStyles(
            materialUiSheets.collect(<App {...props} />),
          )
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {styledComponentSheet.getStyleElement()}
          {materialUiSheets.getStyleElement()}
        </React.Fragment>
      ]
      // styles: (
      //   <>
      //     {initialProps.styles}
      //     {sheet.getStyleElement()}
      //   </>
      // ),
    }
  } finally {
    styledComponentSheet.seal()
  }
}

export default MyDocument

/**
  doc: https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
  https://javascript.plainenglish.io/ssr-with-next-js-styled-components-and-material-ui-b1e88ac11dfa
*/