import {
    Box,
    Link,
} from '@mui/material';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();

    return (
        <WelcomeForm title="Login">
            <WelcomeField label="USERNAME" fieldType="TextField"/>
            <WelcomeField label="PASSWORD" fieldType="TextField" type="password"/>
            <Box>
                <Link 
                    href="#" 
                    underline="none"
                    onClick={() => navigate("/forgotPassword")}
                >
                    Forgot your password?
                </Link>
            </Box>
            <WelcomeField 
                label="LOG IN" 
                fieldType="Button" 
                onClick={() => navigate("/home")}
            />
            <Box>
                <Box>
                    Don't have an account?
                </Box>
                <Link 
                    href="#" 
                    underline="none"
                    onClick={() => navigate("/register")}
                >
                    Register!
                </Link>
            </Box>
        </WelcomeForm>
    );
} 