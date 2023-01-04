/** firebase */
import { db } from "infra/firebase/config"
import { collection, doc, getDoc, addDoc, setDoc } from "firebase/firestore"

const addUser = ({ user }) => new Promise(async resolve => {
  try {
    const { displayName, email, photoURL, uid, phoneNumber } = user

    const ref = doc(db, "users", uid);

    /** check if user already exist */
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      resolve()
    } else {
      // doc.data() will be undefined in this case
      await setDoc(ref,
        {
          name: displayName,
          email: email,
          image: photoURL,
          phoneNumber,
          createAccountDate: new Date(),
          uid
        },
        {
          merge: true
        }
      );
      // console.log("< ADD USER : OK >");
      resolve()
    }
  } catch (e) {
    console.error("\x1b[31m < ADD USER : ERROR >", e);
    resolve()
  }
})

const updateUser = () => { }

const removeUser = () => { }

export {
  addUser,
  updateUser,
  removeUser
}