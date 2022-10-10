/** next */
import Head from 'next/head'
import Link from 'next/link'
/** layout */
import Private from 'shared/layouts/Private'
/** seo */
import PublicHeader from 'shared/seo/public_header'
// import { getSession, signIn } from 'next-auth/client'
// import { useRouter } from 'next/router'
// /** container */
// import Layout from 'containers/Layout'
/** ui */
/** components */
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
/** icons */
import GoogleIcon from '@mui/icons-material/Google'
// /** components */
// import Loading from 'components/Loading/Loading'
// /** notification */
// import cogoToast from 'cogo-toast'
// /** utils */
// import { saveUserPass } from 'utils/session'
// import preventXSS from 'utils/preventXSS/client'

/** view model */
import authViewModel from '___viewModel/authentication'

const Dashboard = () => {
  const { user, state, setState, errors, setErrors, handleLogin, handlLogout } = authViewModel()
  console.log('< AUTH STATE > ', user, state, errors)
  // const router = useRouter()

  return (
    <Private>
      <Head>
        <PublicHeader
          title="Handle App - Dashboard"
        />
      </Head>
      <Container>

        <Grid
          container
          spacing={3}
          justifyContent="center"
        // direction="column"
        // alignItems="center"
        >

          DASHBOARD

        </Grid>

      </Container>
    </Private>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   console.log('< LOGIN GET SERVER > ', session)

//   if (session) {
//     return { redirect: { destination: '/painel/copas', permanent: false } }
//   }
//   return {
//     props: { session }
//   }
// }

export default Dashboard