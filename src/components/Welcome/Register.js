import {
    Box,
    Link,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup, 
    Radio,
} from '@mui/material';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import { useNavigate } from "react-router-dom";

const classes = {
    roleFormControl: {
        display: 'flex',
        width: '80%',
        margin: '0 auto',
        maxWidth: '500px',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    roleFormLabel: {
        color: 'white',
        width: '20%',
        margin: 'auto',
        textAlign: 'left',
    },
    roleRadioGroup: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    roleFormControlLabel: {
        margin: 0,
    }
}

export default function Register(props){
    const navigate = useNavigate();

    return (
        <WelcomeForm title="Register">
            <FormControl sx={classes.roleFormControl}>
                <FormLabel sx={classes.roleFormLabel} id="role-label" className={classes.roleFormLabel}>ROLE:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="role-label"
                    name="role"
                    sx={classes.roleRadioGroup}
                >
                    <FormControlLabel 
                        value="learner" 
                        control={<Radio />} 
                        label="Learner" 
                        sx={classes.roleFormControlLabel}
                    />
                    <FormControlLabel 
                        value="creator" 
                        control={<Radio />} 
                        label="Creator" 
                        sx={classes.roleFormControlLabel}
                    />
                </RadioGroup>
            </FormControl>
            <WelcomeField label="EMAIL" fieldType="TextField"/>
            <WelcomeField label="USERNAME" fieldType="TextField"/>
            <WelcomeField label="PASSWORD" fieldType="TextField" type="password"/>
            <WelcomeField label="CONFIRM PASSWORD" fieldType="TextField" type="password"/>
            <WelcomeField label="REGISTER" fieldType="Button"/>
            <Box>
                <Box>
                    Already have an account?
                </Box>
                <Link 
                    href="#" 
                    underline="none"
                    onClick={() => navigate("/")}
                >
                    Log in!
                </Link>
            </Box>
        </WelcomeForm>
    );
}