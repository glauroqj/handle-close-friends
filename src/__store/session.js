import create from 'zustand'
/** logs */
import storeLog from 'shared/utils/storeLogs'

const SESSION_DEFAULT = {
  uid: false,
  photoURL: '',
  email: '',
  displayName: ''
}

const useSession = create(
  storeLog(
    (set) => ({
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
    })
  ) /** storeLog */
) /** create */

export default useSession