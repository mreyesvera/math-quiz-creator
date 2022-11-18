import * as React from 'react';

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
 * This component sets up a context and provider for the 
 * user authentication values (auth, setAuth). It creates the context,
 * the provider, sets the initial value to empty state and exports
 * the react context and authentication provider component.  
 */

const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = React.useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;