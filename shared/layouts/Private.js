/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import { useEffect } from "react"
/** components */
import Navbar from 'shared/components/Navbar/Navbar'
import Loading from 'shared/components/Loading/Loading'
// import Footer from 'components/Footer/Footer'
/** view model */
import authViewModel from '___viewModel/auth/authentication'

const PrivateLayout = ({ children }) => {
  const { userState, handlLogout } = authViewModel()
  console.log('< PRIVATE > ', userState)

  useEffect(() => {
    if (!userState?.uid && userState?.isInvalidAuth) {
      console.log('< REDIRECT >')
      window.location.href = '/auth'
    }
  }, [userState])


  if (userState?.loading || userState?.isInvalidAuth) {
    return (
      <Loading text='Loading...' color='secondary' />
    )
  }

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'production' && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
      <LoadingGlobal />
      <Navbar
        userState={userState}
        handlLogout={handlLogout}
      />
      {children}
      {/* <Footer /> */}
    </>
  )
}

// export async function getServerSideProps(context) {
//   const { user } = authViewModel()
//   console.log('< PRIVATE GET SERVER > ', user)

//   // if (session) {
//   //   return { redirect: { destination: '/painel/copas', permanent: false } }
//   // }
//   // return {
//   //   props: { session }
//   // }
// }

export default PrivateLayout