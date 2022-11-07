import {
    Box,
} from '@mui/material';
import * as React from 'react';

const classes = {
    container: {
        mx: 2,
        my: 4,
        color: '#e60b4e',
    }
};

export default function Errors(props){
    return (
        <Box
            sx={classes.container}
        >
            <h4>Errors:</h4>
            <ul>
                {
                    props.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))
                }
            </ul>
        </Box>
    );
}