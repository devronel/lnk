import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/'
})

axiosInstance.interceptors.response.use(response => response, async error => {

    const originalConfig = error.config;

    if (error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {

            originalConfig._retry = true;

            try {
                const response = await axiosInstance.post('/user/refresh-token', {}, {
                    withCredentials: true,
                })

                if (response.status === 200) {

                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`;

                    return axiosInstance(originalConfig);
                }
            } catch (error) {
                return Promise.reject(error);
            }

        }

        return Promise.reject(error);
    }

})

export default axiosInstance;