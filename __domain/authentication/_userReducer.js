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
      uid: '',
      displayName: '',
      email: '',
      loading: false,
      isInvalidAuth: true
    };
    default: return state;
  }
}

export default userReducerHandler