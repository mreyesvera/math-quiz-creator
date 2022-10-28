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

export default function AccountDetails(props){
    return (
        <Box>
            <Box 
                sx={classes.row}
            >
                <h4 style={classes.label}>Email: </h4>
                <Box sx={classes.value}>email@domain.com</Box>
            </Box>
            <Box
                sx={classes.row}
            >
                <h4 style={classes.label}>Username: </h4>
                <Box sx={classes.value}>username</Box>
            </Box>
        </Box>
    );
}