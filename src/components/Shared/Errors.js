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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles and displays a list of errors.
 * 
 * @param {Object} props 
 *      - errors: list of errors (strings)
 * @returns {React.ReactElement} Errors Display
 */
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