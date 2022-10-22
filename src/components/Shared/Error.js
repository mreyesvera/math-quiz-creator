import {
    Box,
    FormControl,
    TextField 
} from '@mui/material';
import * as React from 'react';

export default function Error(props){
    return (
        <Box>{props.error}</Box>
    );
}