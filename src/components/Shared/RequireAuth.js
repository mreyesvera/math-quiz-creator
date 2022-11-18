import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const unauthorizedUrl = '/unauthorizedPage';

/**
 * This file is part of a modified implementation of JWT, refresh tokens and axios
 * that was learned through Dave Gray's course on 
 * 'React Login Authentication with JWT Access, Refresh Tokens, Cookies and Axios'
 * (https://www.youtube.com/watch?v=nI8PYZNFtac). 
 * Github reference (https://github.com/gitdagray/react_jwt_auth/).
 * 
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * This file wraps all pages in the application that require authentication 
 * and authorization. It checks the auth from the user auth hook and also
 * considers the allowed roles passed in vs the user's role. 
 *
 * @param {Object} param0 
 *      - allowedRoles: list of allowed roles 
 * @returns {React.ReactElement} Require Authentication Wrapper Component
 */
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