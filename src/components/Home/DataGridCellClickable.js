import {
    Box,
    Button,
    FormControl,
    TextField 
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";

const classes = {
    buttonContainer: {
        width: 1,
    },
    button: {
        width: 1,
    }
};

export default function DataGridCellClickable(props){
    const navigate = useNavigate();

    function onButtonClick(){
        navigate(props.navigateUrl)

        console.log(props.afterNavigate);
        if(props.afterNavigate){
            props.afterNavigate();
        }
    }
    
    return (
        <>
            <Box
                sx={classes.buttonContainer}
            >
                <Button
                    color="primary"
                    onClick={onButtonClick}
                    sx={classes.button}
                >
                    {props.text}
                </Button>
            </Box>
        </>
    );
}