import axios from "../utils/axios/axios";
import useAuth from "./useAuth";

export default function useRefreshToken(){
    const { setAuth } = useAuth();

    async function refresh(){
        try{
            await axios.get('/Authentication/RefreshToken', {
                withCredentials: true
            }).then(response => {
                setAuth(oldAuth => {
                    return {
                        ...oldAuth,
                        accessToken: response.data.accessToken
                    }
                });
            });
        } catch(e){
            console.log(e);
        }
    }

    return refresh;
};