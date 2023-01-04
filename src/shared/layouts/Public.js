/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import { useRouter } from "next/router"
import { useMemo, useEffect } from "react"
/** components */
import Navbar from 'shared/components/Navbar/Navbar'
// import Footer from 'components/Footer/Footer'
// import LoadingGlobal from 'components/LoadingGlobal/LoadingGlobal'
/** view model */
import authViewModel from '___viewModel/authentication/session'
/** utils */
import handleChangeLang from 'shared/utils/language'

const PublicLayout = ({ children }) => {
  const { locale } = useRouter()
  const { handleAuthSessionStart, handlLogout, session } = authViewModel()
  console.log('< PUBLIC > ', session, locale)

  useEffect(() => {
    /** start watch some changes on session */
    handleAuthSessionStart()
  }, [])


  // return (
  //   <>
  //     <Head>
  //       {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'production' && (
  //         <meta name="robots" content="noindex" />
  //       )}
  //     </Head>
  //     {/* <LoadingGlobal /> */}
  //     <Navbar
  //       session={session}
  //       handlLogout={handlLogout}
  //       locale={locale}
  //       handleChangeLang={handleChangeLang}
  //     />
  //     {children}
  //     {/* <Footer /> */}
  //   </>
  // )
  return useMemo(() => (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_CLIENT_APP_ENVIRONMENT !== 'production' && (
          <meta name="robots" content="noindex" />
        )}
      </Head>
      {/* <LoadingGlobal /> */}
      <Navbar
        session={session}
        handlLogout={handlLogout}
        locale={locale}
        handleChangeLang={handleChangeLang}
      />
      {children}
      {/* <Footer /> */}
    </>
  ), [children, session])
}

export default PublicLayout