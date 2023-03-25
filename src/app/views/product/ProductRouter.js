import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppProduct = Loadable(lazy(() => import('../product/AppProduct')));
// const ProductForm = Loadable(lazy(() => import('./ProductForm')));
// const StepperForm = Loadable(lazy(() => import('./StepperForm')));

const ProductRouter = [
    {
        path: '/product',
        element: <AppProduct />,
    },
    // {
    //     path: 'product/newProduct',
    //     element: <ProductForm />,
    // },
    // {
    //     path: 'product/stepperForm',
    //     element: <StepperForm />,
    // },
];

export default ProductRouter;
