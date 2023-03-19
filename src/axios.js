import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response.data) || 'Axios error: error',
        ),
);

export default axiosInstance;
