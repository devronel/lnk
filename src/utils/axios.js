import axios from "axios";

export const SERVER_URL = process.env.API_URL

const axiosInstance = axios.create({
    baseURL: `${SERVER_URL}/api/`
})

// axiosInstance.interceptors.response.use(response => response, async error => {
//     const originalConfig = error.config;
//     if (error.response) {

//         if (originalConfig.url.includes('/user/authenticate')) {
//             return Promise.reject(error);
//         }

//         if (error.response.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;
//             try {
//                 const response = await axiosInstance.get('/user/refresh-token', {
//                     withCredentials: true,
//                 })
                
//                 if (response.status === 200) {
//                     const newAccessToken = response.data.payload.ACCESS_TOKEN
//                     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//                     originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
//                     return axiosInstance(originalConfig);
//                 }
//             } catch (error) {
//                 return Promise.reject(error);
//             }

//         }

//         return Promise.reject(error);
//     }

// })

export default axiosInstance;