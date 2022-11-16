import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import * as React from 'react';

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