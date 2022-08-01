import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './shared/PublicLayout';
import PrivateLayout from './shared/PrivateLayout';
import Login from './components/Welcome/Login';
import Register from './components/Welcome/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  function toggleIsAuthenticated(){
    setIsAuthenticated((oldIsAuthenticated) => !oldIsAuthenticated);
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
