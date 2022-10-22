import {
    Box,
    Button,
    FormControl,
    TextField 
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";

export default function DataGridCellClickable(props){
    const navigate = useNavigate();

    function onButtonClick(){
        navigate(props.navigateUrl)
    }
    
    return (
        <>
            <Box>
                <Button
                    color="primary"
                    onClick={onButtonClick}
                >
                    {props.text}
                </Button>
            </Box>
        </>
    );
}