import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axiosInstance from 'axios.js';
import { MatxLoading } from 'app/components';
import axios from 'axios';
import TokenService from 'app/service/tokenService';

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    fullName: null,
    role: 'na',
};

export const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decodedToken = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
};

const roleOfUser = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decodedToken = jwtDecode(accessToken);
    return decodedToken.roles[0];
};

const setSession = (accessToken, refreshToken) => {
    if (accessToken) {
        TokenService.setCookieAccessToken(accessToken);
        TokenService.setCookieRefreshToken(refreshToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // axios.defaults.headers.common['x-auth-token'] = `Bearer ${accessToken}`;
    } else {
        TokenService.removeAccessToken();
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, fullName } = action.payload;

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                fullName,
            };
        }
        case 'LOGIN': {
            const { fullName } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                fullName,
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                fullName: null,
            };
        }
        // case 'REGISTER': {
        //     const { fullName } = action.payload;

        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         fullName,
        //     };
        // }
        default: {
            return { ...state };
        }
    }
};

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    // register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const login = async (account) => {
        const response_login = await axios
            .post(process.env.REACT_APP_URL + 'un/login', account)
            .catch((error) => console.log(error));
        const { access_token, error, refresh_token } = response_login.data;
        console.log(response_login);
        if (response_login.data && error) {
            return response_login.data;
        }

        if (
            roleOfUser(access_token) === 'SUPER_ADMIN' ||
            roleOfUser(access_token) === 'ADMIN'
        ) {
            setSession(access_token, refresh_token);
            // const response = await axiosInstance.get(
            //     process.env.REACT_APP_URL + 'user/info',
            // );
            // console.log(response);
            // const fullName = response.data.full_name;
            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: true,
                    // fullName,
                    role: roleOfUser(access_token),
                },
            });
            return { request: 'success' };
        } else {
            setSession(null, null);
            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: false,
                    fullName: null,
                },
            });
            return { request: 'forbidden' };
        }
    };

    // const register = async (email, username, password) => {
    //     const response = await axiosInstance.post('/api/auth/register', {
    //         email,
    //         username,
    //         password,
    //     });

    //     const { access_token, user } = response.data;

    //     setSession(access_token);

    //     dispatch({
    //         type: 'REGISTER',
    //         payload: {
    //             user,
    //         },
    //     });
    // };

    const logout = () => {
        setSession(null, null);
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        (async () => {
            try {
                const rs = await axios.post(
                    process.env.REACT_APP_URL + 'un/refresh-token',
                    {
                        refresh_token: TokenService.getCookieRefreshToken(),
                    },
                );
                const { access_token, refresh_token } = rs.data;

                setSession(access_token, refresh_token);

                // const access_token = TokenService.getLocalAccessToken();
                // const refreshToken = TokenService.getLocalRefreshToken();
                if (access_token && isValidToken(access_token)) {
                    if (
                        roleOfUser(access_token) === 'SUPER_ADMIN' ||
                        roleOfUser(access_token) === 'ADMIN'
                    ) {
                        setSession(access_token, refresh_token);
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: true,
                                // fullName,
                                role: roleOfUser(access_token),
                            },
                        });
                    } else {
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: false,
                                fullName: null,
                            },
                        });
                    }
                } else {
                    try {
                        // localStorage.removeItem('access_token');
                        // var refresh_token = TokenService.getLocalRefreshToken();
                        const rs = await axios.post(
                            process.env.REACT_APP_URL + 'un/refresh-token',
                            {
                                refresh_token:
                                    TokenService.getCookieRefreshToken(),
                            },
                        );

                        const { access_token, refresh_token } = rs.data;

                        setSession(access_token, refresh_token);
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: true,
                                // fullName,
                                role: roleOfUser(access_token),
                            },
                        });
                    } catch (_error) {
                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: false,
                                fullName: null,
                            },
                        });
                    }
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        })();
    }, []);

    if (!state.isInitialised) {
        return <MatxLoading />;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                // register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
