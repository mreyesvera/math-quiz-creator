import {
    Box,
} from '@mui/material';

const classes = {
    fieldContainer: {
        padding: '5px 0',
        textAlign: 'center',
    },
};

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Styles a component that is placed in the welcome page. 
 * 
 * @param {Object} props 
 *      - children: React component to display inside the container
 * @returns {React.ReactElement} Welcome component wrapper
 */
export default function WelcomeComponent(props){
    return (
        <Box sx={classes.fieldContainer}>
            {
                props.children
            }
        </Box>
    );
} 