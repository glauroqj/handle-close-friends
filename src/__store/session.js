import create from 'zustand'

const useSession = create((set) => ({
  loading: true,
  session: {
    loading: true,
    uid: false,
    photoURL: '',
    email: '',
    displayName: ''
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
      loading: false,
      uid: false,
      photoURL: '',
      email: '',
      displayName: '',
      isInvalidAuth: true
    }
  }))
}))

export default useSession