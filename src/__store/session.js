import create from 'zustand'

const useSession = create((set) => ({
  loading: true,
  user: {
    uid: false,
    photoURL: '',
    email: '',
    displayName: ''
  }
}))

export default useSession