import {
    Box,
} from '@mui/material';
import * as React from 'react';

const classes = {
    error: {
        color: '#e60b4e',
    }
}

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles and displays a single error.
 * 
 * @param {Object} props
 *      - error: error to display, either an error instance or the actual message 
 * @returns {React.ReactElement} Error Display
 */
export default function Error(props){
    const [error, setError] = React.useState();

    React.useEffect(() => {
        if(props.error){
            if(props.error.message){
                setError(props.error.message);
            } else{
                setError(props.error);
            }
        }
    }, [props.error]);

    return (
        <Box>
            {
                error ?
                <Box sx={classes.error}>{error}</Box>
                :
                <Box>There was an error processing the request</Box>
            }
        </Box>
    );
}