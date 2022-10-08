import { getAuth } from "firebase/auth"

const isUserAuthenticated = async () => {
  const auth = await getAuth()
  return auth
}

export {
  isUserAuthenticated
}