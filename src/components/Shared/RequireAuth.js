import {
    Box,
    Link,
} from '@mui/material';
import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import Unauthorized from './Unauthorized';


export default function RequiredAuth({allowedRoles}){
    const { auth } = useAuth();
    const location = useLocation();

    return (
        <Box>
            {
                (auth && allowedRoles && allowedRoles.includes(auth.role)) ?
                <Outlet />
                :
                <Box>
                    {
                        auth.user ? 
                        <Navigate to="/unauthorizedPage" state={{ from: location}} replace />
                        :
                        <Navigate to="/" state={{ from: location}} replace />
                    }
                </Box>
            }
        </Box>
    );
}