import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const Forbidden = Loadable(lazy(() => import('./Forbidden')));
const ServerError = Loadable(lazy(() => import('./ServerError')));
const sessionRoutes = [
    { path: '/session/signin', element: <JwtLogin /> },
    { path: '/session/forgot-password', element: <ForgotPassword /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '/session/403', element: <Forbidden /> },
    { path: '/session/502', element: <ServerError /> },
];

export default sessionRoutes;
