/** VIEW MODEL - STATE APPLICATION */
import { useState, useEffect, useReducer } from "react"

import login from '__domain/authentication/login'

export default () => {
  // const { isUserAuthenticated } = login()
  // console.log('< AUTH MODEL > ', isUserAuthenticated)
  function userReducerHandler(state, action) {
    console.log('< USER REDUCER > ', action)
    switch (action.type) {
      case 'LOGIN_LOADING': return {
        ...state,
        loading: true
      };
      case 'LOGIN_SUCCESS': return {
        ...state,
        ...action.payload,
        loading: false
      };
      case 'LOGIN_UNAUTHORIZED': return {
        loading: false,
        uid: '',
        displayName: '',
        email: ''
      };
      default: return state;
    }
  }

  const [userState, userDispatch] = useReducer(userReducerHandler,
    {
      loading: true
    }
  );

  const [state, setState] = useState({
    email: '',
    password: '',
    loginType: '', /** email, google, apple, github */
    isLoading: false
  })

  const [errors, setErrors] = useState({
    errorsCount: [],
    fields: ['email', 'password'],
    email: {
      text: ''
    },
    password: {
      text: ''
    }
  })

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
        type: 'LOGIN_UNAUTHORIZED',
        payload: {}
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
            type: 'LOGIN_UNAUTHORIZED',
            payload: {}
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
    state,
    setState,
    errors,
    setErrors,
    /** methods */
    handleLogin,
    handlLogout,
    userDispatch
  }
}