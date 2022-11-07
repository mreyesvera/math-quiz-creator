import {
    Box,
} from '@mui/material';

const classes = {
    root: {
        color: 'white',
    },
    title: {
        margin: '0 0 20px 0',
        fontWeight: 500,
        fontSize: '40px',
    },
};

export default function WelcomeForm(props){
    return (
        <Box sx={classes.root}>
            <h1 style={classes.title}>{props.title}</h1>
            {
                props.children
            }
        </Box>
    );
} 