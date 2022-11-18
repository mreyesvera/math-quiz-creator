import axios from "../utils/axios/axios";
import useAuth from "./useAuth";

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
 * This hook is used to call the refresh token endpoint in the api
 * and reset the access and refresh token once the access token has expired. 
 * It does the call, then sets the updated values. 
 * 
 * There may be a problem refreshing the token at the moment, 
 * but I didn't end up being able to troubleshoot it to make sure it was solved.
 * 
 * @returns React hook used to refresh the user's access and refresh tokens
 */
export default function useRefreshToken(){
    const { auth, setAuth } = useAuth();

    async function refresh(){
        try{
            let response = await axios.post('/Authentication/RefreshToken', {
                accessToken: auth?.accessToken,
                refreshToken: auth?.refreshToken
            }).then(response => {
                setAuth(oldAuth => {
                    return {
                        ...oldAuth,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                });

                return response;
            });

            return response.data.accessToken;
        } catch(e){
            //console.log(e);
        }
    }

    return refresh;
};