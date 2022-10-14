function formLoginReducerHandler(state, action) {
  console.log('< FORM EMAIL PASSWORD REDUCER > ', action)
  switch (action.type) {
    case 'UPDATE_INPUT_VALUE': return {
      ...state,
      ...action.payload,
      loading: false
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

function formErrorLoginReducerhandler(state, action) {
  console.log('< FORM EMAIL PASSWORD ERROR REDUCER > ', action)
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

export {
  formLoginReducerHandler,
  formErrorLoginReducerhandler
}