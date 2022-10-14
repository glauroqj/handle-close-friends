/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import { useMemo } from "react"
/** components */
import Navbar from 'shared/components/Navbar/Navbar'
// import Footer from 'components/Footer/Footer'
// import LoadingGlobal from 'components/LoadingGlobal/LoadingGlobal'
/** view model */
import authViewModel from '___viewModel/auth/authentication'

const PublicLayout = ({ children }) => {
  const { userState, handlLogout } = authViewModel()
  console.log('< PUBLIC > ', userState)

  return useMemo(() => (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'production' && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
      {/* <LoadingGlobal /> */}
      <Navbar
        userState={userState}
        handlLogout={handlLogout}
      />
      {children}
      {/* <Footer /> */}
    </>
  ), [children, userState])
}

export default PublicLayout