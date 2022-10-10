/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import { useEffect } from "react"
/** components */
import Navbar from 'shared/components/Navbar/Navbar'
// import Footer from 'components/Footer/Footer'
// import LoadingGlobal from 'components/LoadingGlobal/LoadingGlobal'
/** view model */
import authViewModel from '___viewModel/authentication'

const PrivateLayout = ({ children }) => {
  const { user } = authViewModel()
  console.log('< PRIVATE > ', user)

  useEffect(() => {
    if (!user?.uid && !user?.loading) {
      console.log('< REDIRECT >')
    }
  }, [])

  if (user?.loading) {
    return (
      <>Carregando...</>
    )
  }

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'production' && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
      {/* <LoadingGlobal /> */}
      <Navbar user={user} />
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