/** VIEW MODEL - STATE APPLICATION - TALKS TO STORE AND DOMAIN */
// import { useEffect, useReducer } from "react"

/** reducers */
// import userReducerHandler from '__domain/authentication/_userReducer'

/** store */
import useSession from '__store/session'
/** domain */
import watchLogin from '__domain/authentication/watchLogin'

export default () => {
  const state = {
    loading: useSession((state) => state.loading),
    user: useSession((state) => state.user)
  }

  // const [userState, userDispatch] = useReducer(userReducerHandler, userInitialState);

  // useEffect(() => {
  //   const { watchUserAuthentication } = watchLogin()
  //   watchUserAuthentication(watchAuth)
  // }, [])

  // const watchAuth = (payload) => {
  //   const { uid } = payload
  //   console.log('< WATCH AUTH > ', payload)
  //   // setUser({ ...payload, loading: false })
  //   /** new way */
  //   if (uid) {
  //     userDispatch({
  //       type: 'LOGIN_SUCCESS',
  //       payload: { ...payload }
  //     })
  //   } else {
  //     userDispatch({
  //       type: 'LOGIN_UNAUTHORIZED'
  //     })
  //   }
  // }

  /** main method */
  const handleLogin = ({ type }) => {
    userDispatch({
      type: 'LOGIN_LOADING'
    })

    const opts = {
      google: async () => {
        const { google } = watchLogin()
        const payload = await google()
        console.log('< LOGIN WITH GOOGLE > ', payload)
        if (payload?.uid) {
          userDispatch({
            type: 'LOGIN_SUCCESS',
            payload: { ...payload }
          })
        } else {
          userDispatch({
            type: 'LOGIN_UNAUTHORIZED'
          })
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
    state,
    // userState,
    // userDispatch,
    /** methods */
    // handleLogin,
    // handlLogout,
  }
}
