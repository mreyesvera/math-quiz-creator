import {
    Box,
    Button,
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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Used to be able to navigate to a specific location when clicking
 * a cell of an MUI data grid. 
 *  
 * @param {Object} props 
 *      - text: Button text
 *      - navigateUrl: Url to navigate to on button click
 *      - afterNavigate: function to run after navigate happens
 * @returns {React.ReactElement} Data Grid Cell Clickable
 */
export default function DataGridCellClickable(props){
    const navigate = useNavigate();

    function onButtonClick(){
        navigate(props.navigateUrl)

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