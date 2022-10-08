/** VIEW MODEL - STATE APPLICATION */
import { useState } from "react"

import login from '__domain/authentication/login'

export default () => {
  // const { isUserAuthenticated } = login()
  // console.log('< AUTH MODEL > ', isUserAuthenticated)

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
    },
  })

  /** main method */
  const handleLogin = ({ type }) => {
    const opts = {
      google: async () => {
        const { google } = login()
        console.log('< LOGIN WITH GOOGLE > ', google())
      }
    }

    type && opts[type]() || new Error('Something got wrong on handleLogin')
  }

  return {
    state,
    setState,
    errors,
    setErrors,
    /** methods */
    handleLogin
  }
}