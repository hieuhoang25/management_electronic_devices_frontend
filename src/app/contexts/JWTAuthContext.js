import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
// import axiosInstance from 'axios';
import { MatxLoading } from 'app/components';
import axios from 'axios.js';
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

export const roleOfUser = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decodedToken = jwtDecode(accessToken);
    return decodedToken.roles[0];
};

const setSession = (accessToken) => {
    if (accessToken) {
        TokenService.setCookieAccessToken(accessToken);
    } else {
        delete TokenService.removeAccessToken();
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
            TokenService.removeAccessToken();
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
    logout: () => Promise.resolve(),
    // register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    var errorMessage;
    const login = async (account) => {
        TokenService.removeAccessToken();
        const response_login = await axios
            .post(process.env.REACT_APP_URL + 'un/login', account)
            .catch(({ response }) => (errorMessage = response.data));

        if (errorMessage && !response_login) {
            return errorMessage;
        }
        const { access_token } = response_login.data;

        const role = response_login.data.roles[0].authority;
        if (
            role === 'SUPER_ADMIN' ||
            role === 'ADMIN' ||
            role === 'ROLE_ADMIN'
        ) {
            const response = await axios.get(
                process.env.REACT_APP_URL + 'user/info',
            );
            setSession(access_token);
            const fullName = response.data.full_name;
            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: true,
                    fullName,
                    role: role,
                },
            });
            return { request: 'success' };
        } else {
            setSession(null);
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
        axios
            .post(process.env.REACT_APP_URL + 'un/logout')
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error));
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        (async () => {
            try {
                const rs = await axios.get(
                    process.env.REACT_APP_URL + 'un/refresh-token',
                );

                TokenService.setCookieAccessToken(rs.data.access_token);
                const access_token = TokenService.getCookieAccessToken();
                if (access_token && isValidToken(access_token)) {
                    if (
                        roleOfUser(access_token) === 'SUPER_ADMIN' ||
                        roleOfUser(access_token) === 'ADMIN'
                    ) {
                        const response = await axios.get(
                            process.env.REACT_APP_URL + 'user/info',
                        );

                        const fullName = response.data.full_name;

                        dispatch({
                            type: 'INIT',
                            payload: {
                                isAuthenticated: true,
                                fullName,
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
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.log(err.response.data.message);
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
