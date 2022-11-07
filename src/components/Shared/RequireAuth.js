import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const unauthorizedUrl = '/unauthorizedPage';

export default function RequiredAuth({allowedRoles}){
    const { auth } = useAuth();
    const location = useLocation();

    // console.log(auth);
    // console.log(auth && allowedRoles);
    // console.log(allowedRoles.includes(auth.user.role))
    // console.log(location);
    return (
        <Box>
            {
                (
                    (auth && allowedRoles && auth.user && allowedRoles.includes(auth.user.role)) 
                    || location.pathname === unauthorizedUrl
                ) ?
                <Outlet />
                :
                <Box>
                    {
                        auth.user ? 
                        <Navigate to={unauthorizedUrl} state={{ from: location}} replace />
                        :
                        <Navigate to="/" state={{ from: location}} replace />
                    }
                </Box>
            }
        </Box>
    );
}