import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const unauthorizedUrl = '/unauthorizedPage';

export default function RequiredAuth({allowedRoles}){
    const { auth } = useAuth();
    const location = useLocation();
    const outletContext = useOutletContext();

    return (
        <Box>
            {
                (
                    (auth && allowedRoles && auth.user && allowedRoles.includes(auth.user.role)) 
                    || location.pathname === unauthorizedUrl
                ) ?
                <Outlet context={outletContext}/>
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