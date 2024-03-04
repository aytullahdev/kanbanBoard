import Axios from "axios";
import { storage } from "./storage";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,

});

axios.interceptors.request.use((config) => {
    // set withCredentials to true to send cookies with requests
    config.withCredentials = true;
    // Allow Access-Control-Allow-Origin


    return config;


});


export default axios;