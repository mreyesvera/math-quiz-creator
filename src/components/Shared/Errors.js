import {
    Box,
    FormControl,
    TextField 
} from '@mui/material';
import * as React from 'react';

export default function Errors(props){
    return (
        <Box>
            <ul>
                {
                    props.errors.map((error, index) => {
                        <li key={index}>error</li>
                    })
                }
            </ul>
        </Box>
    );
}