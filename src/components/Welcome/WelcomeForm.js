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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Styles a form that is placed in the welcome page. 
 * 
 * @param {Object} props 
 *      - title: Form title
 *      - children: React component to display inside the container
 * @returns {React.ReactElement} Welcome Form component wrapper
 */
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