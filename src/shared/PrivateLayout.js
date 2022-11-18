import {
    Box,
    Toolbar,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import * as React from 'react';
import NavDrawer from '../components/Navigation/NavDrawer';
import MenuAppBar from '../components/Navigation/MenuAppBar';
import useAuth from '../hooks/useAuth';

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Wraps the application content when a user is logged in. 
 * It helps display the menu app bar and the navigation drawer. 
 * 
 * @returns {React.ReactElement} Private Layout Wrapper
 */
export default function PrivateLayout() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <MenuAppBar 
                openDrawer={handleDrawerOpen}
            />
            <NavDrawer
                open={open}
                handleOpen={handleDrawerOpen}
                handleClose={handleDrawerClose}
            />
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

