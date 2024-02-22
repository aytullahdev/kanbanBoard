import Axios, { AxiosError } from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,

});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;


});


export default axios;