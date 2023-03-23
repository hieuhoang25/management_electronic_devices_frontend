import { isValidToken } from 'app/contexts/JWTAuthContext';
import axios from 'axios';
import TokenService from 'app/service/tokenService';
const axiosInstance = axios.create();

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) =>
//         Promise.reject(
//             (error.response && error.response.data) || 'Axios error: error',
//         ),
// );

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = window.localStorage.getItem('access_token');
//         if (token) {
//             config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

axiosInstance.interceptors.request.use(
    async (config) => {
        const access_token = TokenService.getCookieAccessToken();
        if (access_token) {
            // config.headers = {
            //     ...config.headers,
            //     authorization: `Bearer ${access_token}`,
            // };
            if (isValidToken(access_token)) {
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
            } else {
                const refresh_token = TokenService.getCookieRefreshToken();
                const rs = await axios.post(
                    process.env.REACT_APP_URL + 'un/refresh-token',
                    {
                        refresh_token: refresh_token,
                    },
                );

                const { access_token } = rs.data;

                // localStorage.setItem('access_token', access_token);
                TokenService.setCookieAccessToken(access_token);
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${access_token}`,
                };

                // axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
            }
        } else {
            var refresh_token = TokenService.getCookieRefreshToken();
            if (refresh_token) {
                const rs = await axios.post(
                    process.env.REACT_APP_URL + 'un/refresh-token',
                    {
                        refresh_token: refresh_token,
                    },
                );

                const { access_token } = rs.data;

                TokenService.setCookieAccessToken(access_token);

                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${access_token}`,
                };
            }
        }

        return config;
    },
    (error) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (
            originalConfig.url !== process.env.REACT_APP_URL + 'un/login' &&
            err.response
        ) {
            // Access Token was expired
            if (err.response.status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;
                var refresh_token = TokenService.getCookieRefreshToken();
                try {
                    const rs = await axios.post(
                        process.env.REACT_APP_URL + 'un/refresh-token',
                        {
                            refresh_token: refresh_token,
                        },
                    );

                    const { access_token } = rs.data;

                    TokenService.setCookieAccessToken(access_token);
                    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    },
);
export default axiosInstance;
