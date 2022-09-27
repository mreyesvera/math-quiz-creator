import {
    Box,
    Divider, 
    Drawer, 
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

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
        //height: 'calc(100% - 32px)',
        height: 1,
        textAlign: 'center',
        color: 'white',
    },
    navContent: {
        //padding: 2,
        //height: 9/10,
        padding: '20px',
        minWidth: '300px',
    },
    navTitle: {
        p: 2,
    }
});

export default function NavDrawer(props){
    const theme = useTheme();
    const classes = createClasses(theme);

    const navItems = ['STATISTICS', 'PROBABILITY', 'LINEAR ALGEBRA'];
    
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
                            <List>
                                {navItems.map((item) => (
                                <ListItem key={item} disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}