/** VIEW MODEL - STATE APPLICATION */
import { useEffect, useReducer } from "react"

import login from '__domain/authentication/login'
/** reducers */
import userReducerHandler from '__domain/authentication/_userReducer'

const userInitialState = {
  loading: true
}

export default () => {

  const [userState, userDispatch] = useReducer(userReducerHandler, userInitialState);

  useEffect(() => {
    const { watchUserAuthentication } = login()
    watchUserAuthentication(watchAuth)
  }, [])

  const watchAuth = (payload) => {
    const { uid } = payload
    console.log('< WATCH AUTH > ', payload)
    // setUser({ ...payload, loading: false })
    /** new way */
    if (uid) {
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

  /** main method */
  const handleLogin = ({ type }) => {
    userDispatch({
      type: 'LOGIN_LOADING'
    })

    const opts = {
      google: async () => {
        const { google } = login()
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
    const { logout } = login()
    logout()
  }

  return {
    userState,
    userDispatch,
    /** methods */
    handleLogin,
    handlLogout,
  }
}
