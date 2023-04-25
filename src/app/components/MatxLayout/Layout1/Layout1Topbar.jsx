import {
    Avatar,
    Hidden,
    Icon,
    IconButton,
    MenuItem,
    useMediaQuery,
} from '@mui/material';
import { Alert, Snackbar } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import { useState, useEffect } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import { Client } from '@stomp/stompjs';
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}));

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

// const IconBox = styled('div')(({ theme }) => ({
//     display: 'inherit',
//     [theme.breakpoints.down('md')]: { display: 'none !important' },
// }));
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const Layout1Topbar = () => {
    const [message, setMessage] = useState('');

    let onConnected = () => {
        client.subscribe('/topic/server', function (msg) {
            console.log(msg.body);
            if (msg.body) {
                setMessage(msg.body);
                setOpenSnackBar(true);
            }
        });
    };

    let onDisconnected = () => {
        console.log('Disconnected!!');
    };
    const client = new Client({
        brokerURL: SOCKET_URL,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: onConnected,
        onDisconnect: onDisconnected,
    });

    useEffect(() => {
        client.activate();
        // eslint-disable-next-line
    }, [message]);

    const theme = useTheme();
    const { settings, updateSettings } = useSettings();
    const { logout, fullName } = useAuth();
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: { leftSidebar: { ...sidebarSettings } },
        });
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const handleSidebarToggle = () => {
        let { layout1Settings } = settings;
        let mode;
        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close';
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
        }
        updateSidebarMode({ mode });
    };
    // const handleLogout = () => {
    //     logout();
    // };
    return (
        <TopbarRoot>
            <TopbarContainer>
                <Box display="flex">
                    <StyledIconButton onClick={handleSidebarToggle}>
                        <Icon>menu</Icon>
                    </StyledIconButton>
                </Box>

                <Box display="flex" alignItems="center">
                    <MatxSearchBox />

                    <NotificationProvider>
                        <NotificationBar />
                    </NotificationProvider>

                    {/* <ShoppingCart /> */}

                    <MatxMenu
                        menuButton={
                            <UserMenu>
                                <Hidden xsDown>
                                    <Span>
                                        Hi <strong>{fullName}</strong>
                                    </Span>
                                </Hidden>
                                <Avatar
                                    src={
                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShN0nuLT7HIpIANuDi6wbMKpeuCgZsl2PtAA&usqp=CAU'
                                    }
                                    sx={{ cursor: 'pointer' }}
                                />
                            </UserMenu>
                        }
                    >
                        <StyledItem>
                            <Link to="/">
                                <Icon> home </Icon>
                                <Span> Home </Span>
                            </Link>
                        </StyledItem>

                        <StyledItem>
                            <Link to="/page-layouts/user-profile">
                                <Icon> person </Icon>
                                <Span> Profile </Span>
                            </Link>
                        </StyledItem>

                        <StyledItem>
                            <Icon> settings </Icon>
                            <Span> Settings </Span>
                        </StyledItem>

                        <StyledItem onClick={logout}>
                            <Icon> power_settings_new </Icon>
                            <Span> Logout </Span>
                        </StyledItem>
                    </MatxMenu>
                </Box>
            </TopbarContainer>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={1500}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                    md={{ width: '100%' }}
                >
                    <AlertTitle>{message}</AlertTitle>
                    <strong>Hãy xác nhận đơn hàng này!</strong>
                </Alert>
            </Snackbar>
        </TopbarRoot>
    );
};

export default React.memo(Layout1Topbar);
