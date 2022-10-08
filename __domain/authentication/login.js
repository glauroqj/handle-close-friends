/** firebase */
import { getAuth } from "firebase/auth"
import { db } from "infra/firebase/config"
/**provider */
import providerGoogle from '__domain/authentication/_provider_google'

export default async () => {
  const google = () => {
    const auth = getAuth();
  }

  return {
    google
  }
}