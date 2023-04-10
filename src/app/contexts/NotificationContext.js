import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios.js';
// import TokenService from 'app/service/tokenService';
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_NOTIFICATIONS': {
            return {
                ...state,
                notifications: action.payload,
            };
        }
        case 'DELETE_NOTIFICATION': {
            return {
                ...state,
                notifications: action.payload,
            };
        }
        case 'CLEAR_NOTIFICATIONS': {
            return {
                ...state,
                notifications: action.payload,
            };
        }
        default: {
            return { ...state };
        }
    }
};
// const setSession = (accessToken) => {
//     if (accessToken) {
//         TokenService.setCookieAccessToken(accessToken);
//     } else {
//         delete TokenService.removeAccessToken();
//     }
// };

const NotificationContext = createContext({
    notifications: [],
    deleteNotification: () => {},
    clearNotifications: () => {},
    getNotifications: () => {},
    createNotification: () => {},
});

export const NotificationProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    // setSession(TokenService.getCookieAccessToken())
    const deleteNotification = async (notificationID) => {
        try {
            const res = await axios.delete(
                process.env.REACT_APP_BASE_URL +
                    `notification/delete/${notificationID}`,
            );

            dispatch({
                type: 'DELETE_NOTIFICATION',
                payload: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    const clearNotifications = async () => {
        try {
            const res = await axios.delete(
                process.env.REACT_APP_BASE_URL + 'notification/delete-all',
            );

            dispatch({
                type: 'CLEAR_NOTIFICATIONS',
                payload: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    const getNotifications = async () => {
        try {
            const res = await axios.get(
                process.env.REACT_APP_BASE_URL + 'notification',
            );

            dispatch({
                type: 'LOAD_NOTIFICATIONS',
                payload: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };
    const createNotification = async (notification) => {
        try {
            const res = await axios.post('/api/notification/add', {
                notification,
            });

            dispatch({
                type: 'CREATE_NOTIFICATION',
                payload: res.data,
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications: state.notifications,
                deleteNotification,
                clearNotifications,
                getNotifications,
                createNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
