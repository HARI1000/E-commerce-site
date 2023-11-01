import { signInWithGooglePopUp ,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const handleBtnClick = async ()=>{
    try{
       const {user}= await signInWithGooglePopUp();
       const docres = await createUserDocumentFromAuth(user);
       
    }
    catch(err)
    {
        console.log(err);
    }
}

const SignIn = () => {
    return (
        <div>
            <h1> Sign IN</h1>
            <button onClick={handleBtnClick}>Click Me</button>
        </div>
    )
}
export default SignIn;