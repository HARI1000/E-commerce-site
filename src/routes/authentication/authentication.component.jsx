import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import './authentication-styles.scss';
////// Used for signin with googleRedirect //////
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

const Authentication = () => {
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
        <div className="authentication-container">
            {/* <button onClick={signInWithGoogleRedirect}>SignInWith google Redirect</button> */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}
export default Authentication;