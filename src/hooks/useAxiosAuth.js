import { axiosAuth } from "../utils/axios/axios";
import * as React from 'react';
import useRefreshToken from "./useRefreshToken";
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
 * This is a React hook that is used to authenticate axios calls
 * to the backend api. 
 * 
 * It adds the bearer access token to the authentication header
 * before sending the request and if receiving an unauthorized
 * response in the case of my api (401) it tries to refresh the token
 * and manage the request. 
 * 
 * There may be a problem refreshing the token at the moment, 
 * but I didn't end up being able to troubleshoot it to make sure it was solved.
 * 
 * @returns React hook used to do authenticated axios calls
 */
export default function useAxiosAuth(){
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    React.useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            function(config){
                if(!auth || !auth.accessToken){
                    return Promise.reject("Invalid auth");
                }

                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            function(error){
                return Promise.reject(error);
            }
        );

        const responseIntercept = axiosAuth.interceptors.response.use(
            function(response){
                return response;
            },
            async function(error){
                const prevRequest = error?.config;
                if(error?.response?.status === 401 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh]);

    return axiosAuth;
}