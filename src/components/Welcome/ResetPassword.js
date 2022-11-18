import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import * as React from 'react';

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Unused component, however, it would handle the resetting password
 * form when user gets to set the new password. 
 * 
 * @returns {React.ReactElement} Reset Password Form
 */
export default function ResetPassword(){
    const [resetPasswordData, setResetPasswordData] = React.useState({
        password: {
            name: "password",
            value: "",
            error: false,
            helperText: "",
            onChange: handleChange
        },
        confirmPassword: {
            name: "confirmPassword",
            value: "",
            error: false,
            helperText: "",
            onChange: handleChange
        }
     });
 
     function handleChange(event){
         const {name, value, type, checked} = event.target;
 
         setResetPasswordData(prevData => ({
             ...prevData,
             [name]: {
                 ...prevData[name],
                 value: type === "checkbox" ? checked : value
             }
         }));
     }

    return (
        <WelcomeForm title="Reset Password">
            <WelcomeField 
                label="PASSWORD" 
                fieldType="TextField" 
                type="password"
                element={resetPasswordData.password}
            />
            <WelcomeField 
                label="CONFIRM PASSWORD" 
                fieldType="TextField" 
                type="password"
                element={resetPasswordData.confirmPassword}
            />
            <WelcomeField label="SUBMIT" fieldType="Button"/>
        </WelcomeForm>
    );
} 