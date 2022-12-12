/** next */
import Head from 'next/head'
import { useRouter } from "next/router"
import Link from 'next/link'
import PropTypes from 'prop-types'
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

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
/** icons */
import GoogleIcon from '@mui/icons-material/Google'
import SchoolIcon from '@mui/icons-material/School'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
// /** components */
// import Loading from 'components/Loading/Loading'
// /** notification */
// import cogoToast from 'cogo-toast'
// /** utils */
// import { saveUserPass } from 'utils/session'
// import preventXSS from 'utils/preventXSS/client'

/** view model */

/** locales */
import locales from 'shared/locales/dashboard.json'

const Dashboard = () => {
  const { locale } = useRouter()
  // const router = useRouter()

  const buildElements = () => {
    const opts = [
      {
        'title': locales[locale]['TITLE_PARTICIPANT'],
        'sub_title': locales[locale]['SUB_TITLE_PARTICIPANT'],
        'btn_text': locales[locale]['BTN_TEXT'],
        'icon': <SchoolIcon />,
        'link': '/dashboard/participant'
      },
      {
        'title': locales[locale]['TITLE_TUTOR'],
        'sub_title': locales[locale]['SUB_TITLE_TUTOR'],
        'btn_text': locales[locale]['BTN_TEXT'],
        'icon': <Diversity1Icon />,
        'link': '/dashboard/tutor'
      },
      {
        'title': locales[locale]['TITLE_MENTOR'],
        'sub_title': locales[locale]['SUB_TITLE_MENTOR'],
        'btn_text': locales[locale]['BTN_TEXT'],
        'icon': <EscalatorWarningIcon />,
        'link': '/dashboard/create/mentor'
      }
    ]

    console.log(opts)

    return opts.map((item, idx) => (
      <Grid item xs={4} key={idx}>
        <Card elevation={2}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {item?.icon} {item?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.sub_title}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={item?.link}>
              <Button
                size='small'
                fullWidth
              >
                {item?.btn_text}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid >
    ))
  }

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
          mt={2}
        // direction="column"
        // alignItems="center"
        >

          <Grid item xs={12} >
            <Typography variant="h3" color="textSecondary" align="center">TESTE</Typography>
          </Grid>

          {buildElements()}

        </Grid>

      </Container>
    </Private>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context
//   // const session = await getSession(context)
//   console.log('< DASHBOARD GET SERVER > ', context)

//   // if (session) {
//   //   return { redirect: { destination: '/painel/copas', permanent: false } }
//   // }
//   // return {
//   //   props: { session }
//   // }
//   return {
//     props: {
//       lang: params?.lang || 'pt'
//     }
//   }
// }

// Dashboard.propTypes = {
//   locale: PropTypes.oneOf(["en-US", "es-ES", "pt-BR"]).isRequired
// }

export default Dashboard