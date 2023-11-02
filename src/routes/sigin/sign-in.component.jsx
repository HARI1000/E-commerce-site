import SignUpForm from "../../components/sigin-up-form/sigin-up-form.component";
import { auth, signInWithGooglePopUp, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
////// Used for signin with googleRedirect //////
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
const handleBtnClick = async () => {
    try {
        const { user } = await signInWithGooglePopUp();
        const docres = await createUserDocumentFromAuth(user);

    }
    catch (err) {
        console.log(err);
    }
}

const SignIn = () => {
////// Used for signin with googleRedirect //////
//     useEffect(() => {
//         async function work() {
//             const response = await getRedirectResult(auth);
//             if (response) {
//                 const userDocRef = await createUserDocumentFromAuth(response.user);
//             }
//         }
//         work();
//     }, []);

    return (
        <div>
            <h1> Sign IN</h1>
            <button onClick={handleBtnClick}>Click Me</button>
            {/* <button onClick={signInWithGoogleRedirect}>SignInWith google Redirect</button> */}
            <SignUpForm/>
        </div>
    )
}
export default SignIn;