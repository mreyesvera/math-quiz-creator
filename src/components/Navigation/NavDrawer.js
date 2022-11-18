import {
    Box,
    Divider, 
    Drawer,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import NavTopicsList from './NavTopicsList';

const createClasses = (theme) => ({
    navBackground: {
        height: 1,
        backgroundImage: 'url("/images/colorful_background_rotated.png")',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflowX: 'hidden',
    },
    navContentBackground: {
        background: theme.palette.darBackgroundOpaque,
        mixBlendMode: 'hard-light',
        minHeight: '100vh',
        height: 'auto',
        textAlign: 'center',
        color: 'white',
    },
    navContent: {
        py: '20px',
        minWidth: '400px',
    },
    navTitle: {
        p: 2,
    }
});

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Manages and displays the application's navigation drawer, 
 * which allows users to browse the different quizzes.
 * 
 * @param {Object} props 
 *      - open: whether the nav drawer is open or not
 *      - handleClose: function to close the nav drawer
 * @returns {React.ReactElement} Navigation Drawer
 */
export default function NavDrawer(props){
    const theme = useTheme();
    const classes = createClasses(theme);
    
    return (
        <Box component="nav">
            <Drawer
            variant="temporary"
            open={props.open}
            onClose={props.handleClose}
            >
                <Box sx={classes.navBackground}>
                    <Box sx={classes.navContentBackground}>
                        <Box sx={classes.navContent}>
                            <Typography variant="h6" sx={classes.navTitle}>
                                MathVI
                            </Typography>
                            <Divider />
                            <NavTopicsList onItemSelected={props.handleClose}/>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}