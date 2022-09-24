import {
    Box,
    Link,
} from '@mui/material';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';

export default function ResetPassword(){
    return (
        <WelcomeForm title="Reset Password">
            <Box>
                Enter your email address, 
                and we'll send you an email with your username 
                and a link to reset your password.
            </Box>
            <WelcomeField label="EMAIL" fieldType="TextField"/>
            <WelcomeField label="SEND LINK" fieldType="Button"/>
            <Box>
                <Box>
                    Remembered your password?
                </Box>
                <Link href="#" underline="none">
                    Log In!
                </Link>
            </Box>
        </WelcomeForm>
    );
} 