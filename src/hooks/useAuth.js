import * as React from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    //const { auth } = useContext(AuthContext);
    return React.useContext(AuthContext);
}

export default useAuth;