import {
    Box,
    Link,
} from '@mui/material';
import * as React from 'react';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import { useNavigate } from "react-router-dom";

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Manages and displays a forgot password form accessible from
 * the welcome page. 
 * 
 * @returns {React.ReactElement} Forgot Password Form
 */
export default function ForgotPassword(){
    const navigate = useNavigate();

    const [forgotPasswordData, setForgotPasswordData] = React.useState({
       email: {
            name: 'email',
            value: "",
            error: false,
            helperText: "",
            onChange: handleChange
       } 
    });

    function handleChange(event){
        const {name, value, type, checked} = event.target;

        setForgotPasswordData(prevData => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                value: type === "checkbox" ? checked : value
            }
        }));
    }

    return (
        <WelcomeForm title="Forgot Password">
            <WelcomeField fieldType="Text">
                Enter your email address, 
                and we'll send you an email with your username 
                and a link to reset your password.
            </WelcomeField>
            <WelcomeField 
                label="EMAIL" 
                fieldType="TextField"
                element={forgotPasswordData.email}
            />
            <WelcomeField label="SEND LINK" fieldType="Button"/>
            <Box>
                <Box>
                    Remembered your password?
                </Box>
                <Link 
                    href="#" 
                    underline="none"
                    onClick={() => navigate("/")}
                >
                    Log In!
                </Link>
            </Box>
        </WelcomeForm>
    );
} 