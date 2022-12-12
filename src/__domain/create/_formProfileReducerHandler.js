function formProfileReducerHandler(state, action) {
  console.log('< FORM PROFILE REDUCER > ', action)
  switch (action.type) {
    case 'UPDATE_INPUT_VALUE': return {
      ...state,
      ...action.payload,
      loading: false
    };
    case 'FORM_SUBMIT': return {
      ...state,
      loading: true
    };
    default: return state;
  }
}

export {
  formProfileReducerHandler
}