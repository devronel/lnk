import axios from "axios";

export const SERVER_URL = 'http://localhost:3001/'
// export const SERVER_URL = 'https://lnk-api.netlify.app/'

const axiosInstance = axios.create({
    baseURL: `${SERVER_URL}api/`
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
//                 const response = await axiosInstance.post('/user/refresh-token', {}, {
//                     withCredentials: true,
//                 })

//                 if (response.status === 200) {

//                     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload.auth_token}`;

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