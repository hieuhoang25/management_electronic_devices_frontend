import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'app/components';

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    fullName: null,
    role: 'na',
};

const isValidToken = (accessToken) => {
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

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('access_token');
        delete axios.defaults.headers.common.Authorization;
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

        const { access_token, error } = response_login.data;
        if (response_login.data && error) {
            return response_login.data;
        }
        if (
            roleOfUser(access_token) === 'SUPER_ADMIN' ||
            roleOfUser(access_token) === 'ADMIN'
        ) {
            setSession(access_token);
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
    //     const response = await axios.post('/api/auth/register', {
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
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        (async () => {
            try {
                const access_token =
                    window.localStorage.getItem('access_token');

                if (access_token && isValidToken(access_token)) {
                    if (
                        roleOfUser(access_token) === 'SUPER_ADMIN' ||
                        roleOfUser(access_token) === 'ADMIN'
                    ) {
                        setSession(access_token);
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
                            usfullNameer: null,
                        },
                    });
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
