import axios from "axios";

export const SERVER_URL = process.env.API_URL

const axiosInstance = axios.create({
    baseURL: `${SERVER_URL}/api`
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }   
        
        return config;
    },
    (error) => { return Promise.reject(error) }
);

export default axiosInstance;