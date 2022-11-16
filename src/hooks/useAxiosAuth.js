import { axiosAuth } from "../utils/axios/axios";
import * as React from 'react';
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

/**
 * https://github.com/gitdagray/react_jwt_auth/
 * @returns 
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