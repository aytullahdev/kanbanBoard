import Axios from "axios";
import { storage } from "./storage";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,

});

axios.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;


});


export default axios;