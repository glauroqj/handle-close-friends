/** firebase */
import { db } from "infra/firebase/config"
/**provider */
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
/** domain */
import { isUserAuthenticated } from '__domain/session/session'

export default () => {

  const google = async () => {
    const provider = new GoogleAuthProvider()
    const auth = await isUserAuthenticated()
    console.log(' LOGIN DOMAIN ', auth)

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log('< GOOGLE LOGIN : OK > ', result)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('< GOOGLE LOGIN : ERROR > ', error)
      });
  }

  return {
    google
  }
}