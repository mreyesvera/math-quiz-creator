import {
    Box,
} from '@mui/material';
import * as React from 'react';

const classes = {
    error: {
        color: '#e60b4e',
    }
}

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