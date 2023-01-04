/** VIEW MODEL - STATE APPLICATION - TALKS TO STORE AND DOMAIN */

/** store */
import useSession from '__store/session'
/** domain */
import watchLogin from '__domain/authentication/watchLogin'

export default () => {
  /** store state */
  const loadingSession = useSession((state) => state.loading)
  const session = useSession((state) => state.session)
  /** store methods */
  const loginLoading = useSession((state) => state.loginLoading)
  const loginSucess = useSession(state => state.loginSucess)
  const loginUnauthorized = useSession(state => state.loginUnauthorized)

  const handleAuthSessionStart = () => {
    const { watchUserAuthentication } = watchLogin()
    watchUserAuthentication(authSessionListener)
  }

  const authSessionListener = (payload) => {
    const { uid } = payload
    /** new way */
    if (uid) {
      console.log('\x1b[32m < authSessionListener : success > ', payload)
      loginSucess(payload)
      // userDispatch({
      //   type: 'LOGIN_SUCCESS',
      //   payload: { ...payload }
      // })
    } else {
      console.log('\x1b[31m < authSessionListener : unauthorized > ', payload)
      loginUnauthorized()
      // userDispatch({
      //   type: 'LOGIN_UNAUTHORIZED'
      // })
    }
  }

  /** main method */
  const handleLogin = ({ type }) => {

    loginLoading()

    const opts = {
      google: async () => {
        const { google } = watchLogin()
        const payload = await google()

        console.log('< LOGIN WITH GOOGLE > ', payload)

        if (payload?.uid) {
          loginSucess(payload)
        } else {
          loginUnauthorized()
        }
      }
    }

    type && opts[type]() || new Error('Something got wrong on handleLogin')
  }

  const handlLogout = () => {
    const { logout } = watchLogin()
    logout()
  }

  return {
    loadingSession,
    session,
    /** handlers */
    handleLogin,
    handleAuthSessionStart,
    handlLogout
  }
}
