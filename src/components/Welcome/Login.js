import {
    Box,
    Link,
} from '@mui/material';
import * as React from 'react';
import WelcomeForm from "./WelcomeForm";
import WelcomeField from './WelcomeField';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { emailRegex } from '../../utils/regex';
import Error from '../Shared/Error';
import axios from '../../utils/axios/axios';

export default function Login(){
    const navigate = useNavigate();
    // Removed auth but can be readded if needed
    const { setAuth } = useAuth();
    const [doLogin, setDoLogin] = React.useState(false);
    const [loginData, setLoginData] = React.useState({
        email: {
            name: "email",
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
        }
    });
    const [error, setError] = React.useState();


    React.useEffect(() => {
        if(doLogin){
            async function postLogin(userLogin){
                try {
                    await axios.post('/Authentication/Login', userLogin)
                        .then(response => {
                            console.log(response);

                            if(response.status === 200){
                                setAuth(response.data);
                                navigate("/home");
                            }
                        })
                        .catch(error => {
                            let displayedError = error;
                            if(error?.response?.data?.errors){
                                displayedError = error.response.data.errors[0];
                            }
                            setError(displayedError);
                        });
                } catch(error){
                    setError(error);
                }
            }

            setDoLogin(false);
            postLogin({
                "email": loginData.email.value, 
                "password": loginData.password.value
            });
        }
    }, [doLogin, loginData, navigate, setAuth])

    function handleChange(event){
        //console.log("changed");
        const {name, value, type, checked} = event.target;

        setLoginData(prevLoginData => ({
            ...prevLoginData,
            [name]: {
                ...prevLoginData[name],
                value: type === "checkbox" ? checked : value
            }
        }));
    }

    function validateFields(){
        let emailError = "";
        let passwordError = "";

        if(!loginData.email.value){
            emailError = "Required";
        } else if(!emailRegex.test(loginData.email.value)){
            emailError = "Invalid email"
        }

        if(!loginData.password.value){
            passwordError = "Required";
        } 

        setLoginData(oldLoginData => {
            return {
                email: {
                    ...oldLoginData.email,
                    error: emailError.length > 0,
                    helperText: emailError,
                },
                password: {
                    ...oldLoginData.password,
                    error: passwordError.length > 0,
                    helperText: passwordError,
                },
            }
        });

        return emailError.length === 0 && passwordError.length === 0;
    }

    function login(){
        let valid = validateFields();
        console.log(valid);

        if(valid){
            setDoLogin(true);
            //props.setIsAuthenticated(true);
            //navigate("/home");
        }
    }

    return (
        <WelcomeForm title="Login">
            {
                error &&
                <Error error={error} />
            }
            <WelcomeField 
                label="EMAIL" 
                fieldType="TextField" 
                element={loginData.email}
            />
            <WelcomeField 
                label="PASSWORD" 
                fieldType="TextField" 
                type="password" 
                element={loginData.password}
            />
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
                onClick={login}
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