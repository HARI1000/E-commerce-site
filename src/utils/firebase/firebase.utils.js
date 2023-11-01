// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";
import {getFirestore,doc,setDoc,getDoc} from "firebase/firestore";
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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});


export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = await doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
      const {displayName,email} = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        })  
      }
      catch(err)
      {console.log(err);}
    }
    return userDocRef;
}
