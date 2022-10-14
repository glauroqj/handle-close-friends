/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
/** components */
import Navbar from 'shared/components/Navbar/Navbar'
// import Footer from 'components/Footer/Footer'
// import LoadingGlobal from 'components/LoadingGlobal/LoadingGlobal'
/** view model */
import authViewModel from '___viewModel/authentication'

const PublicLayout = ({ children }) => {
  const { userState } = authViewModel()
  console.log('< PUBLIC > ', userState)

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'production' && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
      {/* <LoadingGlobal /> */}
      <Navbar userState={userState} />
      {children}
      {/* <Footer /> */}
    </>
  )
}

export default PublicLayout