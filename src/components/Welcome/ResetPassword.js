import {
    Box,
    Link,
} from '@mui/material';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';

export default function ResetPassword(){
    return (
        <WelcomeForm title="Reset Password">
            <WelcomeField label="PASSWORD" fieldType="TextField" type="password"/>
            <WelcomeField label="CONFIRM PASSWORD" fieldType="TextField" type="password"/>
            <WelcomeField label="SUBMIT" fieldType="Button"/>
        </WelcomeForm>
    );
} 