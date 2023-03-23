const getCookieRefreshToken = () => {
    const refresh_token = window.localStorage.getItem('refresh_token');
    // const refresh_token = Cookies.get('refresh_token');
    return refresh_token;
};

const getCookieAccessToken = () => {
    const access_token = window.localStorage.getItem('access_token');
    // const access_token = Cookies.get('access_token');
    return access_token;
};
const setCookieAccessToken = (accessToken) => {
    // Cookies.set('access_token', accessToken);
    window.localStorage.setItem('access_token', accessToken);
};
const setCookieRefreshToken = (refreshToken) => {
    // Cookies.set('refresh_token', refreshToken);
    window.localStorage.setItem('refresh_token', refreshToken);
};
const removeAccessToken = () => {
    // Cookies.remove('access_token');
    window.localStorage.removeItem('access_token');
};
const removeRefreshToken = () => {
    // Cookies.remove('refresh_token');
    window.localStorage.removeItem('refresh_token');
};
const TokenService = {
    getCookieRefreshToken,
    getCookieAccessToken,
    setCookieAccessToken,
    setCookieRefreshToken,
    removeAccessToken,
    removeRefreshToken,
};

export default TokenService;
