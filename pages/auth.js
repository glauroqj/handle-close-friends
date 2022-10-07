/** next */
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
/** layout */
import Public from 'shared/layouts/Public'
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
// import {
//   Container,
//   Grid,
//   Button,
//   Typography,
//   Paper,
//   TextField,
//   Box
// } from '@material-ui/core'
// /** components */
// import Loading from 'components/Loading/Loading'
// /** notification */
// import cogoToast from 'cogo-toast'
// /** utils */
// import { saveUserPass } from 'utils/session'
// import preventXSS from 'utils/preventXSS/client'

/** view model */
import userViewModel from '___viewModel/authentication'

const Login = () => {
  // const router = useRouter()
  // const [ session, loading ] = useSession()

  const [state, setState] = useState({
    email: '',
    password: '',
    captcha: '',
    loading: false
  })

  const [errors, setErrors] = useState({
    errorsCount: [],
    fields: ['email', 'password'],
    email: {
      text: ''
    },
    password: {
      text: ''
    },
  })

  // console.log('< ROUTER LOGIN > ', router)

  useEffect(() => {
    /** GA */
    if (window?.dataLayer && window?.gtag) {
      // gtag('send', {'pageview': window.location.pathname})
    }
  }, [])

  const submit = async () => {
    const { redirect } = router?.query || false
    const { email, password, captcha } = state

    if (email === '' || password === '') return false

    setState({
      ...state,
      loading: true
    })

    /** store user pass */
    saveUserPass(password)

    const login = await signIn('credentials', {
      redirect: false,
      email: preventXSS(email),
      password
    })

    console.log('< LOGIN : CLIENT > ', login)

    if (login.status === 200) {
      /** GA */
      if (window?.dataLayer && window?.gtag) {
        gtag('event', 'login', { 'method': 'Platform' })
      }
      if (window?.fbq) {
        fbq('track', 'Login', {
          email: email
        })
      }

      /** check params in url */
      if (redirect) {
        location = redirect
        return false
      }

      /** ELSE */
      location = '/painel/copas'
      return false
    }

    if (login.status !== 200) {
      cogoToast.error('Email ou senha inválidos! Verifique por favor', { hideAfter: 5 })
      cogoToast.warn('Caso já tenha conta cadastrada, verifique seu email', { hideAfter: 10 })
      setState({
        email: '',
        password: '',
        captcha: '',
        loading: false
      })
    }
  }

  const updateErrors = () => {
    const { email, password } = state

    const errorPayload = {
      ...errors,
      errorsCount: []
    }

    const validationOptions = {
      email: (item) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
          errorPayload[item].text = 'Email inválido'
          errorPayload.errorsCount = [...errorPayload.errorsCount, item]
          return false
        }
        if (!email || email.match(/^\s*$/)) {
          errorPayload[item].text = 'Campo obrigatório'
          errorPayload.errorsCount = [...errorPayload.errorsCount, item]
        }
      },
      password: (item) => {
        if (password.length < 6) {
          errorPayload[item].text = 'Mínimo de 6 caracteres'
          errorPayload.errorsCount = [...errorPayload.errorsCount, item]
          return false
        }
        if (!password || password.match(/^\s*$/)) {
          errorPayload[item].text = 'Campo obrigatório'
          errorPayload.errorsCount = [...errorPayload.errorsCount, item]
        }
      }
    }

    errors.fields.forEach((field) => {
      /** reset each field */
      errorPayload[field].text = ''
      validationOptions[field](field)
    })
    setErrors(errorPayload)

    console.log('< ERRORS COUNT > ', errorPayload)
    if (errorPayload.errorsCount.length === 0) submit()
  }

  const login = () => {
    window.location.href = (`https://api.instagram.com/oauth/authorize?client_id=3217961178471425&redirect_uri=https://handle-close-friends.com.br:5000/auth/instagram&scope=user_profile,user_media&response_type=code&state=1`)
    // if (window?.FB) {
    //   window.FB.getLoginStatus(function (response) {
    //     // statusChangeCallback(response);
    //     console.log('< RESPONSE > ', response)
    //     if (response?.status === "unknown") {
    //       window.FB.login()
    //     }
    //     if (response?.status === "connected") {
    //       window.FB.api(
    //         "/me/friendlists",
    //         function (response) {
    //           console.log('< CALL CLOSE FRIEND > ', response)
    //           if (response && !response.error) {
    //             /* handle the result */
    //             console.log(response)
    //           }
    //         }

    //         //           https://api.instagram.com/oauth/authorize
    //         // ?client_id=3217961178471425
    //         // &redirect_uri=https://handle-close-friends.com.br:5000/auth/instagram
    //         // &scope=user_profile,user_media
    //         // &response_type=code
    //         // &state=1

    //       );
    //     }
    //   });
    // }
  }

  return (
    <Public>
      <Head>
        <PublicHeader
          title="Handle App - Login"
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

          <Grid item xs={12} md={8} lg={4}>
            <Paper
              elevation={2}
              sx={{
                margin: '5rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px'
              }}
            >

              <Typography variant="h2" color="textSecondary" align="center">Login</Typography>
              <Typography variant="body1" color="textSecondary" align="center">Acessar plataforma</Typography>

              <form
                sx={{
                  width: '100%', // Fix IE 11 issue.
                  marginTop: '3rem'
                }}
                autoComplete="true"
                onKeyDown={(e) => {
                  e?.keyCode === 13 && (
                    e.preventDefault(),
                    updateErrors()
                  )
                }}
              >

                <TextField
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  style={{ margin: '8px 0' }}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                  inputProps={{ maxLength: 100 }}
                  helperText={errors.email.text}
                  error={errors.email.text ? true : false}
                  value={state.email}
                  autoComplete="email"
                />

                <TextField
                  label="Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  style={{ margin: '8px 0' }}
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                  inputProps={{ maxLength: 100 }}
                  helperText={errors.password.text}
                  error={errors.password.text ? true : false}
                  value={state.password}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => updateErrors()}
                  disabled={state.loading}
                  sx={{ margin: '8px 0px 0px' }}
                >
                  {!state.loading && 'Entrar'}
                  {/* {state.loading && (
                    <>
                      Entrando...
                      <Loading />
                    </>
                  )} */}
                </Button>

                <Box component="div" display="flex" justifyContent="space-around" mt={2} width="100%" >
                  <Link href="/recuperar-senha">
                    <Button variant="outlined" color="secondary" size="small">
                      Esqueceu a senha?
                    </Button>
                  </Link>

                  <Link href="/criar-conta">
                    <Button variant="outlined" color="secondary" size="small">
                      Quero criar conta
                    </Button>
                  </Link>
                </Box>

              </form>
            </Paper>
          </Grid>

        </Grid>

      </Container>
    </Public>
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

export default Login