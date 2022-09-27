import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './shared/PublicLayout';
import PrivateLayout from './shared/PrivateLayout';
import Login from './components/Welcome/Login';
import Register from './components/Welcome/Register';
import ForgotPassword from './components/Welcome/ForgotPassword';
import ResetPassword from './components/Welcome/ResetPassword';
import Home from './pages/Home';
import { ThemeProvider } from "./shared/Theme";
import { Box } from '@mui/material';

const classes = {
  root: {
    fontFamily: 'Poppins',
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

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
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
              </Route>
            }
            { isAuthenticated &&
              <Route element={<PrivateLayout />}>
                <Route path="/home" element={<Home />} />
              </Route>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
