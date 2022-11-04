/** VIEW MODEL - STATE APPLICATION */
import { useReducer } from "react"
/** reducers */
import {
  formProfileReducerHandler
} from '__domain/create/_formProfileReducerHandler'

const formInitialState = {
  education: '',
  experiencies: '',
  certificates: '',
  availability: '',
  hobbies: '',
  expertise: '',
  urlSlug: '',
  loading: false
}

export default () => {
  const [formState, formDispatch] = useReducer(formInitialState, formProfileReducerHandler)

  return {
    formState,
    formDispatch
  }
}