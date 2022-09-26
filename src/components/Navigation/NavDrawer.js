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
import * as React from 'react';

export default function NavDrawer(props){
    const navItems = ['STATISTICS', 'PROBABILITY', 'LINEAR ALGEBRA'];
    
    return (
        <Box component="nav">
        <Drawer
          variant="temporary"
          open={props.open}
          onClose={props.handleClose}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ my: 2 }}>
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
        </Drawer>
      </Box>
    );
}