import {
    Box,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from '@mui/material';
import * as React from 'react';
import useAuth from '../../hooks/useAuth';

const classes = {
    row: {
        display: 'flex'

    },
    label: {
        margin: 0,
    },
    value: {
        paddingLeft: 1,
    }
}

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Shows user account details for Account page. 
 * @returns {React.ReactElement} User Account Details
 */
export default function AccountDetails(){
    const { auth } = useAuth();

    return (
        <Box>
            <Box 
                sx={classes.row}
            >
                <h4 style={classes.label}>Email: </h4>
                <Box sx={classes.value}>{auth?.user?.email}</Box>
            </Box>
            <Box
                sx={classes.row}
            >
                <h4 style={classes.label}>Username: </h4>
                <Box sx={classes.value}>{auth?.user?.userName}</Box>
            </Box>
        </Box>
    );
}