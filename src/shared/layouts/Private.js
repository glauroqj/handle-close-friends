/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import { useRouter } from "next/router"
import { useEffect } from "react"
/** components */
import Navbar from 'shared/components/Navbar/Navbar'
import Loading from 'shared/components/Loading/Loading'
import LoadingGlobal from 'shared/components/LoadingGlobal/LoadingGlobal'
// import Footer from 'components/Footer/Footer'
/** view model */
import authViewModel from '___viewModel/authentication/session'
/** utils */
import handleChangeLang from 'shared/utils/language'

const PrivateLayout = ({ children }) => {
  const { locale } = useRouter()
  const { handleAuthSessionStart, handlLogout, session } = authViewModel()
  console.log('< PRIVATE > ', session, locale)

  useEffect(() => {
    /** start watch some changes on session */
    handleAuthSessionStart()
  }, [])

  useEffect(() => {
    if (!session?.uid && session?.isInvalidAuth) {
      console.log('< REDIRECT >')
      window.location.href = '/login'
    }
  }, [session])


  if (session?.loading || session?.isInvalidAuth) {
    return (
      <Loading text='Loading...' color='secondary' />
    )
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <LoadingGlobal />
      <Navbar
        session={session}
        handlLogout={handlLogout}
        locale={locale}
        handleChangeLang={handleChangeLang}
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