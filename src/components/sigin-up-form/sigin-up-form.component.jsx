import { useState } from "react";
import { createUserAuthWithEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.componets";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmpassword: ""
}

const SignUpForm = () => {

    const [userDetails, setUserDetails] = useState(defaultFormFields);
    const { displayName, email, password, confirmpassword } = userDetails;



    const handleInputChange = (e) => {
        //{} we are directly destructuring the e.target object and stroing the value in e.target to name and value
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
        console.log(userDetails);
    }

    const resetForm = () =>{
        setUserDetails(defaultFormFields);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(password === confirmpassword)) {
            alert("The passwords typed are not matching");
            return;
        }
        try {
            const {user} = await createUserAuthWithEmailPassword(email, password);
            console.log(user);
            await createUserDocumentFromAuth(user, { displayName });
        }
        catch (err) {
            if (err.code === 'auth/email-already-in-use')
                alert("Email already in use");
            else
                console.log("Error in user creation in firestore", err);
        }
        resetForm();
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput  
                    label='Display Name'               
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    label="Email"
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    label="Password"
                    type='text'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    label="Confirm Password"
                    type='text'
                    name='confirmpassword'
                    value={confirmpassword}
                    onChange={handleInputChange}
                    required
                />
                
                <Button buttonType='google' type="submit">Sign UP</Button>
            </form>
        </div>
    )
}
export default SignUpForm;