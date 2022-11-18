import axios from 'axios';
import mathQuizCreatorAPI from '../../config/mathQuizCreatorAPI.json';

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
 * This file configures two axios instances. The first one would be used
 * for unauthenticated axios calls, only setting the backend api url.
 * The second one would be configured for authenticated axios calls, 
 * setting any additional needed parameters. In this case, they both
 * are practically the same. In the case of the use of cookies for the
 * authenticated session, we would have to include withCredentials here.
 * 
 */

export default axios.create({
    baseURL: mathQuizCreatorAPI.baseURL
});

export const axiosAuth = axios.create({
    baseURL: mathQuizCreatorAPI.baseURL,
    headers: {'Content-Type': 'application/json'},
});