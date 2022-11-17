import axios from "../utils/axios/axios";
import useAuth from "./useAuth";

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
            console.log(e);
        }
    }

    return refresh;
};