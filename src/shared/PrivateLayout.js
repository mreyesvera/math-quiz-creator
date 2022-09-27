import {
    Box,
    Toolbar,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import * as React from 'react';
import NavDrawer from '../components/Navigation/NavDrawer';
import MenuAppBar from '../components/Navigation/MenuAppBar';

export default function PrivateLayout(props) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <MenuAppBar 
                openDrawer={handleDrawerOpen}
                setIsAuthenticated={props.setIsAuthenticated}
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

