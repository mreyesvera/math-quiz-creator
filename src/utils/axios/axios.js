import axios from 'axios';
import mathQuizCreatorAPI from '../../config/mathQuizCreatorAPI.json';

export default axios.create({
    baseURL: mathQuizCreatorAPI.baseURL
});

export const axiosAuth = axios.create({
    baseURL: mathQuizCreatorAPI.baseURL,
    headers: {'Content-Type': 'application/json'},
    //withCredentials: true
});