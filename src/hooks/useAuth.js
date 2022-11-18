import * as React from 'react';
import AuthContext from '../context/AuthProvider';

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
 * This is a React hook used to use the authentication context provided
 * by the AuthProvider. 
 * 
 * Returns a react hook used to use the authentication context
 */

const useAuth = () => {
    return React.useContext(AuthContext);
}

export default useAuth;