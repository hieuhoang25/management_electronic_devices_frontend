import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppProduct = Loadable(lazy(() => import('../product/AppProduct')));

const ProductRouter = [
  {
    path: '/product',
    element: <AppProduct />,
  },
];

export default ProductRouter;
