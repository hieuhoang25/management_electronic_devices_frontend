import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppColorStorage = Loadable(lazy(() => import('./AppColorStorage')));

const ColorStorageRouter = [
    {
        path: '/color-storage',
        element: <AppColorStorage />,
    },
];
export default ColorStorageRouter;
