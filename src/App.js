import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './shared/PublicLayout';
import PrivateLayout from './shared/PrivateLayout';
import Login from './components/Welcome/Login';
import Register from './components/Welcome/Register';
import { ThemeProvider } from "./shared/Theme";
import { Box } from '@mui/material';

const classes = {
  root: {
    fontFamily: 'Poppins'
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  function toggleIsAuthenticated(){
    setIsAuthenticated((oldIsAuthenticated) => !oldIsAuthenticated);
  }

  return (
    <Box sx={classes.root}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            { !isAuthenticated &&
              <Route element={<PublicLayout toggleAuthentication={toggleIsAuthenticated} />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            }
            { isAuthenticated &&
              <Route element={<PrivateLayout />}>

              </Route>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
