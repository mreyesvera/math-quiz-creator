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
        /*height: 'calc(100% - 32px)',
        height: 1,*/
        minHeight: '100vh',
        height: 'auto',
        textAlign: 'center',
        color: 'white',
    },
    navContent: {
        //padding: 2,
        //height: 9/10,
        py: '20px',
        minWidth: '340px',
    },
    navTitle: {
        p: 2,
    }
});

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
                            <NavTopicsList />
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}