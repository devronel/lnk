import axios from "axios";

export const SERVER_URL = process.env.API_URL

const axiosInstance = axios.create({
    baseURL: `${SERVER_URL}/api`,
    withCredentials: true,
    withXSRFToken: true 
})

export default axiosInstance;