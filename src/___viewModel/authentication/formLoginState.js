/** VIEW MODEL - STATE APPLICATION */
import { useReducer } from "react"
/** reducers */
import {
  formLoginReducerHandler,
  formErrorLoginReducerhandler
} from '__domain/authentication/_formLoginReducerHandler'

const formInitialState = {
  email: '',
  password: '',
  loading: false
}

const errorFormInitialState = {
  errorsCount: [],
  fields: ['email', 'password'],
  email: {
    text: ''
  },
  password: {
    text: ''
  }
}

export default () => {
  const [formState, formDispatch] = useReducer(formLoginReducerHandler, formInitialState);

  const [errorFormState, errorFormDispatch] = useReducer(formErrorLoginReducerhandler, errorFormInitialState);

  return {
    formState,
    formDispatch,

    errorFormState,
    errorFormDispatch,
  }
}