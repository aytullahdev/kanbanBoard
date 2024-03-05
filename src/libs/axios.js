import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // set withCredentials to true to send cookies with requests
    withCredentials: true,

});

axios.interceptors.request.use((config) => {

    return config;


});


export default axios;