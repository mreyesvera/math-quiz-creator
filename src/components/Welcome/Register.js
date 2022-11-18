import {
    Box,
    Link,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup, 
    Radio,
} from '@mui/material';
import * as React from 'react';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import Error from '../Shared/Error';
import { useNavigate } from "react-router-dom";
import Roles from '../../config/roles.json';
import { emailRegex, passwordRegex } from '../../utils/regex';
import axios from '../../utils/axios/axios';

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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Manages and displays a register form accessible from the welcome page.
 * 
 * @returns {React.ReactElement} Register Form
 */
export default function Register(){
    const navigate = useNavigate();

    const [doRegister, setDoRegister] = React.useState(false);
    const [registerData, setRegisterData] = React.useState({
        role: {
            name: "role",
            value: "Learner",
            error: false,
            helperText: "Required",
            onChange: handleChange
        },
        email: {
            name: "email",
            value: "",
            error: false,
            helperText: "",
            onChange: handleChange
        },
        username: {
            name: "username",
            value: "",
            error: false,
            helperText: "",
            onChange: handleChange
        },
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
    const [disableRegister, setDisableRegister] = React.useState(false);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        if(doRegister){
            async function postRegister(userRegister){
                try {
                    await axios.post('/Authentication', userRegister)
                        .then(response => {
                            //console.log(response);

                            if(response.status === 201){
                                navigate("/");
                            }
                        })
                        .catch(error => {
                            let displayedError = error;
                            if(error?.response?.data?.errors){
                                displayedError = error.response.data.errors[0];
                            }
                            setError(displayedError);
                        })
                } catch(error){
                    setError(error)
                }
                setDisableRegister(false);
            }

            setDisableRegister(true);
            setDoRegister(false);
            postRegister({
                "username": registerData.username.value,
                "email": registerData.email.value,
                "role": registerData.role.value,
                "password": registerData.password.value
            }); 
        }
    }, [doRegister, navigate, registerData])

    function handleChange(event){
        const {name, value, type, checked} = event.target;

        setRegisterData(prevRegisterData => ({
            ...prevRegisterData,
            [name]: {
                ...prevRegisterData[name],
                value: type === "checkbox" ? checked : value
            }
        }));
    }

    function validateFields(){
        let roleError = "";
        let emailError = "";
        let usernameError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if(!registerData.role.value){
            roleError = "Required";
        } else if(!Roles.roles.includes(registerData.role.value)){
            roleError = "Invalid role";
        }

        if(!registerData.email.value){
            emailError = "Required";
        } else if(!emailRegex.test(registerData.email.value)){
            emailError = "Invalid email"
        }

        if(!registerData.username.value){
            usernameError = "Required";
        } else if(registerData.username.value.length === 0 || registerData.username.value.length > 50){
            usernameError = "Username should be between 0 and 50 characters"
        }

        if(!registerData.password.value){
            passwordError = "Required";
        } else if(!passwordRegex.test(registerData.password.value)){
            passwordError = "Password should have minimum 10 characters, " +
            "at least one uppercase letter, one lowercase letter, one number and one special character";
        }

        if(!registerData.confirmPassword.value){
            confirmPasswordError = "Required";
        } else if(registerData.confirmPassword.value !== registerData.password.value){
            confirmPasswordError = "Password and confirm password don't match"
        }

        setRegisterData(oldRegisterData => {
            return {
                role: {
                    ...oldRegisterData.role,
                    error: roleError.length > 0,
                    helperText: roleError,
                },
                email: {
                    ...oldRegisterData.email,
                    error: emailError.length > 0,
                    helperText: emailError,
                },
                username: {
                    ...oldRegisterData.username,
                    error: usernameError.length > 0,
                    helperText: usernameError,
                },
                password: {
                    ...oldRegisterData.password,
                    error: passwordError.length > 0,
                    helperText: passwordError,
                },
                confirmPassword: {
                    ...oldRegisterData.confirmPassword,
                    error: confirmPasswordError.length > 0,
                    helperText: confirmPasswordError,
                }
            }
        });

        return roleError.length === 0 && emailError.length === 0 && usernameError.length === 0 
            && passwordError.length === 0 && confirmPasswordError.length === 0;
    }

    function register(event){
        let valid = validateFields();

        if(valid){
            setDoRegister(true);
        }
    }

    return (
        <WelcomeForm title="Register">
            {
                error &&
                <Error error={error} />
            }
            <FormControl 
                sx={classes.roleFormControl}
                error={registerData.role.error}
                //helperText={registerData.role.helperText}
            >
                <FormLabel sx={classes.roleFormLabel} id="role-label">ROLE:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="role-label"
                    name={registerData.role.name}
                    value={registerData.role.value}
                    onChange={registerData.role.onChange}
                    sx={classes.roleRadioGroup}
                >
                    <FormControlLabel 
                        value="Learner" 
                        control={<Radio />} 
                        label="Learner" 
                        sx={classes.roleFormControlLabel}
                    />
                    <FormControlLabel 
                        value="Creator" 
                        control={<Radio />} 
                        label="Creator" 
                        sx={classes.roleFormControlLabel}
                    />
                </RadioGroup>
            </FormControl>
            <WelcomeField 
                label="EMAIL" 
                fieldType="TextField"
                element={registerData.email}
            />
            <WelcomeField 
                label="USERNAME" 
                fieldType="TextField"
                element={registerData.username}
            />
            <WelcomeField 
                label="PASSWORD" 
                fieldType="TextField" 
                type="password"
                element={registerData.password}
            />
            <WelcomeField 
                label="CONFIRM PASSWORD" 
                fieldType="TextField" 
                type="password"
                element={registerData.confirmPassword}
            />
            <WelcomeField 
                label="REGISTER" 
                fieldType="Button"
                onClick={register}
                disabled={disableRegister}
            />
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