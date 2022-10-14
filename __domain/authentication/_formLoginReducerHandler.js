function formLoginReducerHandler(state, action) {
  console.log('< FORM EMAIL PASSWORD REDUCER > ', action)
  switch (action.type) {
    case 'UPDATE_INPUT_VALUE': return {
      ...state,
      ...action.payload,
      loading: false
    };
    case 'EMAIL_PASSWORD_LOADING': return {
      ...state,
      loading: true
    };
    case 'FORM_SUBMIT': return {
      ...state,
      loading: true
    };
    default: return state;
  }
}

function formErrorLoginReducerhandler(state, action) {
  console.log('< FORM EMAIL PASSWORD ERROR REDUCER > ', action)
  switch (action.type) {
    case 'UPDATE_INPUT_ERRORS': return {
      ...state,
      ...action?.payload
    };
    default: return state;
  }
}

export {
  formLoginReducerHandler,
  formErrorLoginReducerhandler
}