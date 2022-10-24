/** firebase */
// import { db } from "infra/firebase/config"
/**provider */
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
/** handle */
import { addUser } from '__domain/authentication/_handleUserAccount'

export default () => {

  const getUserAuthenticationInstance = async () => {
    const auth = await getAuth()
    console.log(auth)
    return auth
  }

  const watchUserAuthentication = async (callback) => {
    // console.log('< watchUserAuthentication > ', callback)
    const auth = await getUserAuthenticationInstance()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('< watchUserAuthentication > ', user)
        callback(user)
        // ...
      } else {
        callback({})
        // User is signed out
        // ...
      }
    });
  }

  const google = () => new Promise(async resolve => {
    const provider = new GoogleAuthProvider()
    const auth = await getUserAuthenticationInstance()
    // console.log(' LOGIN DOMAIN ', auth)

    if (!!auth?.currentUser?.uid) {
      resolve({ ...auth?.currentUser })
    } else {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          /** ADD or UPDATE USER IN DB */
          await addUser({ user: user })

          // console.log('< GOOGLE LOGIN : OK > ', result)
          resolve({ ...user })
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error?.code;
          const errorMessage = error?.message;
          // The email of the user's account used.
          const email = error?.customData?.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          // console.log('< GOOGLE LOGIN : ERROR > ', error, credential)
          resolve({
            error: {
              errorCode,
              errorMessage,
              email
            }
          })
        });
    }
  })

  const logout = async () => {
    const auth = await getUserAuthenticationInstance();
    signOut(auth).then(() => {
      console.log('< logout user >')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return {
    watchUserAuthentication,
    logout,
    google
  }
}