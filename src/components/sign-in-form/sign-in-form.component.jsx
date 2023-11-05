import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componet";
import { useState , } from "react";
import {  signInAuthWithEmailAndPassword, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
const defaultValue = { email: "", password: "" };

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultValue);
    const { email, password } = formFields;
    // const {setCurrentUser} = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultValue);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopUp();
            // setCurrentUser(user);
            // await createUserDocumentFromAuth(user);
        }
        catch (err) { console.log(err); }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await signInAuthWithEmailAndPassword(email, password);
            // setCurrentUser(respone.user);
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }

    };
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
};
export default SignInForm;