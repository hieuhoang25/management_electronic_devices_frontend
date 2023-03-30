import axios from 'axios';
import TokenService from 'app/service/tokenService';
import { roleOfUser } from 'app/contexts/JWTAuthContext';
const axiosInstance = axios.create({
    withCredentials: true,
});
axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/un/login' && err.response) {
            // Access Token was expired
            console.log(err.response.status);
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await axiosInstance
                        .get(process.env.REACT_APP_URL + 'un/refresh-token')
                        .catch((error) => {
                            window.location.reload(''); //handle when refreshtoken expired
                        });
                    console.log(roleOfUser(rs.data.access_token));
                    if (
                        !rs.data.access_token ||
                        roleOfUser(rs.data.access_token) === 'USER'
                    ) {
                        window.location.reload('');
                    }
                    TokenService.setCookieAccessToken(rs.data.access_token);

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
