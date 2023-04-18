import {
    Avatar,
    Badge,
    Box,
    Grid,
    Pagination,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
// eslint-disable-next-line
import Chip from '@mui/material/Chip';
import {
    productTableHeader,
    productVariantTableHeader,
} from 'app/utils/constant';
import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import {
    getProductsList,
    deleteProduct,
    getProductById,
    changeStateTable,
    setPageProduct,
    HANDLE_RESET_PRODUCT,
} from 'app/redux/actions/ProductAction';
import ButtonProduct from './ButtonProduct';
import {
    getProductVariant,
    deleteProductVariant,
    getProductVSelectedFromStore,
    setPageNumberProductVariant,
} from 'app/redux/actions/ProductVariantAction';
import {
    getProductAttribute,
    RESET_PRODUCT_ATTRIBUTE,
} from 'app/redux/actions/ProductAttributeAction';
import { v4 } from 'uuid';
import Loadable from 'app/components/Loadable';
import DialogProductVariant from './Dialog/DialogProductVariant';
import { formatCurrency } from 'app/utils/utils';
import Loading from 'app/components/MatxLoading';
import { HANDLE_RESET_CATEGORY } from 'app/redux/actions/CategoryAction';

const DialogProduct = Loadable(lazy(() => import('./Dialog/DialogProduct')));
const DialogProductAttribute = Loadable(
    lazy(() => import('./Dialog/DialogProductAttribute')),
);

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));
// avatar
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '5px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

//end avatar
const ProductTable = ({ ...props }) => {
    const { reRender } = props;
    const [bodyTable, setBodyTable] = useState([{}]);
    const [idSelected, setIdSelected] = useState(-1);
    const [open, setOpen] = useState(false);
    const [openDialogProduct, setOpenDialogProduct] = useState(false);
    const [openDialogProductV, setOpenDialogProductV] = useState(false);
    const products = useSelector((state) => state.products);
    const productVariant = useSelector((state) => state.productVariant);
    const productAttribute = useSelector((state) => state.productAttribute);
    const [loading, setLoading] = useState(false);
    // const [page, setPage] = useState(products.pageNumber);
    const dispatch = useDispatch();
    if (!products.listProduct.data) {
        products.listProduct.data = [];
    }
    const handleChange = (event, value) => {
        if (products.stateTable === 'product') {
            dispatch(setPageProduct(value));
            dispatch(getProductsList(5, value - 1));
        } else {
            dispatch(
                getProductVariant(5, value - 1, productVariant.product_id),
            );
            dispatch(setPageNumberProductVariant(value));
        }
    };

    useEffect(() => {
        setLoading(true);

        if (products.stateTable === 'product') {
            (async () => {
                await dispatch(getProductsList(5, products.pageNumber - 1));
            })();
        } else {
            if (productVariant.product_id !== '') {
                (async () => {
                    await dispatch(
                        getProductVariant(
                            5,
                            productVariant.pageNumber - 1,
                            productVariant.product_id,
                        ),
                    );
                })();
            }
        }

        setLoading(false);

        // eslint-disable-next-line
    }, [
        bodyTable,
        openDialogProductV,
        products.stateDeleted.deleted,
        products.keysearch,
        // openDialogProduct,
        reRender,
    ]);
    useEffect(() => {
        return () => {
            dispatch({
                type: HANDLE_RESET_PRODUCT,
            });
            dispatch({
                type: HANDLE_RESET_CATEGORY,
            });
        };
        // eslint-disable-next-line
    }, []);
    function handleOpenProductAttribute(id) {
        setIdSelected(id);
        dispatch(getProductAttribute(id));
        setOpen(true);
    }
    function handleClose() {
        dispatch({
            type: RESET_PRODUCT_ATTRIBUTE,
        });

        setOpen(false);
    }
    const handleDelete = async (value, isDelted, name) => {
        setLoading(true);
        if (name === 'product') {
            await dispatch(deleteProduct(value, isDelted));
            await dispatch(getProductsList(5, products.pageNumber - 1));
            setBodyTable(products.listProduct.data);
        } else {
            await dispatch(deleteProductVariant(value, isDelted));
            await dispatch(
                getProductVariant(
                    5,
                    productVariant.pageNumber - 1,
                    productVariant.product_id,
                ),
            );

            setBodyTable(Math.random() * 100);
        }
        setLoading(false);
    };

    async function handleClosedialogProduct() {
        await Promise.resolve(
            dispatch(getProductsList(5, products.pageNumber - 1)),
        );
        setOpenDialogProduct(false);
    }
    //PRODUCT VARIANT
    const handleClickShowDetail = async (id) => {
        setIdSelected(id);
        dispatch(changeStateTable('productVariant'));
        dispatch(getProductVariant(5, productVariant.pageNumber - 1, id));
    };
    const handleOpenDialogProduct = (id) => {
        dispatch(getProductById(id));
        setIdSelected(id);
        setOpenDialogProduct(true);
    };
    const handleOpenDiaLogProductV = (id) => {
        dispatch(getProductVSelectedFromStore(id));
        setOpenDialogProductV(true);
    };

    const handleCloseDialogProductV = () => {
        dispatch(
            getProductVariant(
                5,
                productVariant.pageNumber - 1,
                productVariant.product_id,
            ),
        );
        setOpenDialogProductV(false);
    };

    return loading ? (
        <Loading />
    ) : (
        <Box width="100%" mt={3}>
            <StyledTable>
                <TableHead sx={{ maxHeight: 440 }} overflow={'scroll'}>
                    <TableRow>
                        {products.stateTable === 'product'
                            ? productTableHeader.map((value, index) =>
                                  index === 0 ? (
                                      <TableCell
                                          sx={{ fontSize: '100%' }}
                                          align="left"
                                          key={index}
                                      >
                                          {value}
                                      </TableCell>
                                  ) : (
                                      <TableCell
                                          sx={{ fontSize: '100%' }}
                                          align="center"
                                          key={index}
                                      >
                                          {value}
                                      </TableCell>
                                  ),
                              )
                            : productVariantTableHeader.map((value, index) =>
                                  index === 0 ? (
                                      <TableCell
                                          sx={{ fontSize: '100%' }}
                                          align="left"
                                          key={index}
                                      >
                                          {value}
                                      </TableCell>
                                  ) : (
                                      <TableCell
                                          sx={{ fontSize: '100%' }}
                                          align="center"
                                          key={index}
                                      >
                                          {value}
                                      </TableCell>
                                  ),
                              )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.stateTable === 'product' ? (
                        products.listProduct.data.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {product.product_name}
                                </TableCell>
                                <TableCell align="justify">
                                    {product.is_delete ? (
                                        <Avatar
                                            sx={{ width: 120, height: 120 }}
                                            alt="Hình ánh sản phẩm"
                                            variant="square"
                                            src={
                                                process.env
                                                    .REACT_APP_BASE_URL_FIREBASE +
                                                product.image +
                                                '?alt=media&token=' +
                                                v4()
                                            }
                                            key={new Date()
                                                .getTime()
                                                .toString()}
                                        />
                                    ) : (
                                        <StyledBadge
                                            overlap="rectangular"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 120,
                                                    height: 120,
                                                }}
                                                alt="Hình ánh sản phẩm"
                                                variant="square"
                                                src={
                                                    process.env
                                                        .REACT_APP_BASE_URL_FIREBASE +
                                                    product.image +
                                                    '?alt=media&token=' +
                                                    v4()
                                                }
                                            />
                                        </StyledBadge>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {product.brand_name}
                                </TableCell>
                                <TableCell align="center">
                                    {product.category_name}
                                </TableCell>
                                <TableCell align="center">
                                    {format(
                                        parseISO(product.create_date, 1),
                                        'HH:mm:ss dd/MM/yyyy ',
                                    ).toString()}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={
                                            product.promotion_name
                                                ? product.promotion_name
                                                : 'Không có'
                                        }
                                        color="success"
                                    />
                                </TableCell>
                                {/* <TableCell align="center">
                                    {product.is_delete ? 'true' : 'false'}
                                </TableCell> */}
                                <TableCell align="center">
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <ButtonProduct
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    handleOpenProductAttribute(
                                                        product.id,
                                                    );
                                                }}
                                            >
                                                Thông số
                                            </ButtonProduct>
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <ButtonProduct
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    handleDelete(
                                                        product.id,
                                                        product.is_delete
                                                            ? 0
                                                            : 1,
                                                        'product',
                                                    );
                                                }}
                                            >
                                                Ẩn/Bỏ ẩn
                                            </ButtonProduct>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <ButtonProduct
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    handleClickShowDetail(
                                                        product.id,
                                                    );
                                                }}
                                            >
                                                Chi tiết
                                            </ButtonProduct>
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <ButtonProduct
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    handleOpenDialogProduct(
                                                        product.id,
                                                    );
                                                }}
                                            >
                                                Chỉnh sửa
                                            </ButtonProduct>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : //product_variant
                    productVariant.data.length === 0 ? (
                        <></>
                    ) : (
                        productVariant.data.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {product.sku_name}
                                </TableCell>
                                <TableCell align="justify">
                                    {!product.status ? (
                                        <Avatar
                                            sx={{ width: 120, height: 120 }}
                                            alt="Hình ánh sản phẩm"
                                            variant="square"
                                            src={
                                                process.env
                                                    .REACT_APP_BASE_URL_FIREBASE +
                                                    product.image +
                                                    '?alt=media&token=' +
                                                    v4() || ''
                                            }
                                            key={new Date()
                                                .getTime()
                                                .toString()}
                                        />
                                    ) : (
                                        <StyledBadge
                                            overlap="rectangular"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 120,
                                                    height: 120,
                                                }}
                                                alt="Hình ánh sản phẩm"
                                                variant="square"
                                                src={
                                                    process.env
                                                        .REACT_APP_BASE_URL_FIREBASE +
                                                        product.image +
                                                        '?alt=media&token=' +
                                                        v4() || ''
                                                }
                                            />
                                        </StyledBadge>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {product.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell align="center">
                                    {product.display_name}
                                </TableCell>
                                <TableCell align="center">
                                    {product.color_name}
                                </TableCell>
                                <TableCell align="center">
                                    {product.storage_name}
                                </TableCell>

                                <TableCell align="center">
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12}>
                                            <ButtonProduct
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    handleDelete(
                                                        product.id,
                                                        product.status ? 0 : 1,
                                                        'productVariant',
                                                    );
                                                }}
                                            >
                                                Ẩn/Bỏ ẩn
                                            </ButtonProduct>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12}>
                                            <ButtonProduct
                                                variant="outlined"
                                                color="success"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    handleOpenDiaLogProductV(
                                                        product.id,
                                                    );
                                                }}
                                            >
                                                Chỉnh sửa
                                            </ButtonProduct>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </StyledTable>
            <Stack justifyContent="center" alignItems="center" mt={3}>
                <Typography component="span">
                    {/* Page: {products.pageNumber} */}
                </Typography>
                <Pagination
                    count={
                        products.stateTable === 'product'
                            ? products.totalPage
                            : parseInt(productVariant.totalPage) || 1
                    }
                    page={
                        products.stateTable === 'product'
                            ? products.pageNumber
                            : productVariant.pageNumber
                    }
                    onChange={handleChange}
                />
            </Stack>
            {open && (
                <DialogProductAttribute
                    open={open}
                    productAttributeList={productAttribute.data}
                    handleClose={handleClose}
                    idProduct={idSelected}
                />
            )}
            {openDialogProduct && (
                <DialogProduct
                    open={openDialogProduct}
                    handleClose={handleClosedialogProduct}
                    id={idSelected}
                    products={products.productById}
                    productAttributeList={[]}
                />
            )}
            {openDialogProductV && (
                <DialogProductVariant
                    open={openDialogProductV}
                    handleClose={handleCloseDialogProductV}
                    id={idSelected}
                    productVariantById={productVariant.productVariantById}
                />
            )}
        </Box>
    );
};

export default ProductTable;
