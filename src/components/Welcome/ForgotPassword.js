import {
    Box,
    Link,
} from '@mui/material';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(){
    const navigate = useNavigate();

    return (
        <WelcomeForm title="Forgot Password">
            <WelcomeField fieldType="Text">
                Enter your email address, 
                and we'll send you an email with your username 
                and a link to reset your password.
            </WelcomeField>
            <WelcomeField label="EMAIL" fieldType="TextField"/>
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