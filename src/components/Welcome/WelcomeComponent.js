import {
    Box,
} from '@mui/material';

const classes = {
    fieldContainer: {
        padding: '5px 0',
        textAlign: 'center',
    },
};

export default function WelcomeComponent(props){
    return (
        <Box sx={classes.fieldContainer}>
            {
                props.children
            }
        </Box>
    );
} 