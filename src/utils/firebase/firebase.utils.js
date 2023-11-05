// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut ,onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to us
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyCHxxdJGo1lHCXy_mLq00AU1D4CGg6bPe8",
  authDomain: "crwn-clothing-db-11976.firebaseapp.com",
  projectId: "crwn-clothing-db-11976",
  storageBucket: "crwn-clothing-db-11976.appspot.com",
  messagingSenderId: "515968032377",
  appId: "1:515968032377:web:46acd2aaaf169a17373ea8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleauthprovider = new GoogleAuthProvider();
googleauthprovider.setCustomParameters({
  prompt: "select_account",
});


export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleauthprovider);


// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleauthprovider);
export const db = getFirestore();

export const createUserAuthWithEmailPassword = async (email, password) => {
  if (!(email && password))
    return;
  try {
    console.log(email, password);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
    console.log("Using the email password", res);
  }
  catch (err) {
    console.log(err);
  }
}

export const signInAuthWithEmailAndPassword = async (email, password) => { 
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password) };

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth)
    return;

  const userDocRef = await doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    }
    catch (err) { console.log("error creating user", err); }
  }
  return userDocRef;
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);