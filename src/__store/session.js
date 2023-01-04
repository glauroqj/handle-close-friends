import create from 'zustand'

const SESSION_DEFAULT = {
  uid: false,
  photoURL: '',
  email: '',
  displayName: ''
}

const useSession = create((set) => ({
  loading: true,
  session: {
    ...SESSION_DEFAULT,
    loading: true
  },
  loginLoading: () => set((state) => ({
    ...state,
    loading: true,
    session: {
      ...state.session,
      loading: true
    }
  })),
  loginSucess: (userPayload) => set((state) => ({
    ...state,
    loading: false,
    session: { ...userPayload, loading: false }
  })),
  loginUnauthorized: () => set((state) => ({
    ...state,
    loading: false,
    session: {
      ...SESSION_DEFAULT,
      loading: false,
      isInvalidAuth: true
    }
  }))
}))

export default useSession