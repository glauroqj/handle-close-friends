/** VIEW MODEL - STATE APPLICATION */
import { useState, useEffect, useReducer } from "react"

import login from '__domain/authentication/login'
/** reducers */
import userReducerHandler from '__domain/authentication/_userReducer'
import {
  formLoginReducerHandler,
  formErrorLoginReducerhandler
} from '__domain/authentication/_formLoginReducerHandler'

export default () => {
  const [userState, userDispatch] = useReducer(userReducerHandler,
    {
      loading: true
    }
  );

  const [formState, formDispatch] = useReducer(formLoginReducerHandler,
    {
      email: '',
      password: '',
      loading: false
    }
  );

  const [errorFormState, errorFormDispatch] = useReducer(formErrorLoginReducerhandler,
    {
      errorsCount: [],
      fields: ['email', 'password'],
      email: {
        text: ''
      },
      password: {
        text: ''
      }
    }
  );

  // const [state, setState] = useState({

  // })

  // const [errors, setErrors] = useState({

  // })

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
    userDispatch,

    formState,
    formDispatch,

    errorFormState,
    errorFormDispatch,

    /** methods */
    handleLogin,
    handlLogout,
  }
}