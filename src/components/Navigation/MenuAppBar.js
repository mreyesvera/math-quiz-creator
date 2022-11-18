import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const classes = {
  root: {
    backgroundImage: 'url("/images/colorful_background_rotated.png")',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
};

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Displays the application's top bar that allows navigation to the
 * nav drawer and to the account and logout. 
 * 
 * @param {Object} props 
 *      - openDrawer: Function to open the nav drawer
 * @returns {React.ReactElement} Menu App Bar
 */
export default function MenuAppBar(props) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout(){
    handleClose();
    navigate("/");
    setAuth({});
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" sx={classes.root}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, '&:hover': { cursor: 'pointer'} }}
            onClick={() => navigate("/home")}
          >
            MathVI
          </Typography>
          <Box
            sx={{
              textAlign: 'right',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem 
                onClick={() => {
                  handleClose();
                  navigate("/account");
                }}
              >
                My Account
              </MenuItem>
              <MenuItem 
                onClick={logout}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
