/** VIEW MODEL - STATE APPLICATION */
import { useState } from "react"

import login from '__domain/authentication/login'

export default () => {
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
      google: ''
    }
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