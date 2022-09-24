import {
    Box,
    Link,
} from '@mui/material';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';

export default function Login(){
    return (
        <WelcomeForm title="Login">
            <WelcomeField label="USERNAME" fieldType="TextField"/>
            <WelcomeField label="PASSWORD" fieldType="TextField"/>
            <Box>
                <Link href="#" underline="none">
                    Forgot your password?
                </Link>
            </Box>
            <WelcomeField label="LOG IN" fieldType="Button"/>
            <Box>
                <Box>
                    Don't have an account?
                </Box>
                <Link href="#" underline="none">
                    Register!
                </Link>
            </Box>
        </WelcomeForm>
    );
} 