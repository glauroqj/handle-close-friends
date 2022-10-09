/** VIEW MODEL - STATE APPLICATION */
import { useState, useEffect } from "react"

import login from '__domain/authentication/login'

export default () => {
  // const { isUserAuthenticated } = login()
  // console.log('< AUTH MODEL > ', isUserAuthenticated)
  const [user, setUser] = useState({})

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
    console.log('< WATCH AUTH > ', payload)
  }

  /** main method */
  const handleLogin = ({ type }) => {
    const opts = {
      google: async () => {
        const { google } = login()
        const payload = await google()
        console.log('< LOGIN WITH GOOGLE > ', payload)
        setUser(payload)
      }
    }

    type && opts[type]() || new Error('Something got wrong on handleLogin')
  }

  return {
    user,
    state,
    setState,
    errors,
    setErrors,
    /** methods */
    handleLogin
  }
}