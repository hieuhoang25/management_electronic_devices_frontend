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

import {
    productTableHeader,
    productVariantTableHeader,
} from 'app/utils/constant';
import { lazy, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { format, parseISO } from 'date-fns';
import {
    getProductsList,
    deleteProduct,
    getProductById,
    changeStateTable,
} from 'app/redux/actions/ProductAction';
import ButtonProduct from './ButtonProduct';
import {
    getProductVariant,
    deleteProductVariant,
} from 'app/redux/actions/ProductVariantAction';
import { getProductAttribute } from 'app/redux/actions/ProductAttributeAction';
import { v4 } from 'uuid';
import Loadable from 'app/components/Loadable';

const DialogProduct = Loadable(lazy(() => import('./DialogProduct')));
const DialogProductAttribute = Loadable(
    lazy(() => import('./DialogProductAttribute')),
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
const SimpleTable = (props) => {
    const {
        getProductsList,
        products,
        getProductVariant,
        getProductAttribute,
        productAttribute,
        deleteProduct,
        getProductById,
        productVariant,
        changeStateTable,
        deleteProductVariant,
    } = props;
    if (!products.listProduct.data) {
        products.listProduct.data = [];
    }
    //check null productAttribute
    const [page, setPage] = useState(1);
    const [productList, setProductList] = useState([{}]);
    const [idSelected, setIdSelected] = useState(-1);

    const handleChange = (event, value) => {
        if (products.stateTable === 'product') {
            getProductsList(5, value - 1);
        } else {
            getProductVariant(1, value - 1, products.productId);
        }
        setPage(value);
    };

    const handleClickShowDetail = (id) => {
        changeStateTable('productVariant');
        getProductVariant(5, 0, id);
    };
    useEffect(() => {
        if (products.stateTable === 'product') {
            getProductsList(5, page - 1);
        }
        // setProductList(products.listProduct.data);

        // eslint-disable-next-line
    }, [productList, setOpen]);
    const [open, setOpen] = useState(false);
    function handleOpenProductAttribute(id) {
        // setIdSelected(id);
        getProductAttribute(id);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    const handleDelete = async (value, isDelted, name) => {
        if (name === 'product') {
            await deleteProduct(value, isDelted);
            await getProductsList(5, page - 1);
            setProductList(products.listProduct.data);
        } else {
            await deleteProductVariant(value, isDelted);
            await getProductVariant(5, 0, productVariant.product_id);
            console.log(productVariant);
            setProductList(Math.random() * 100);
        }
    };

    const [openDialogProduct, setOpenDialogProduct] = useState(false);

    function handleClosedialogProduct() {
        getProductsList(5, page - 1);
        setOpenDialogProduct(false);
    }
    const handleOpenDialogProduct = (id) => {
        getProductById(id);
        setIdSelected(id);
        setOpenDialogProduct(true);
    };
    const handleOpenDiaLogPDVariant = (id) => {};

    return (
        <Box width="100%">
            <StyledTable>
                <TableHead sx={{ maxHeight: 440 }} overflow={'scroll'}>
                    <TableRow>
                        {products.stateTable === 'product'
                            ? productTableHeader.map((value, index) =>
                                  index === 0 ? (
                                      <TableCell align="left" key={index}>
                                          {value}
                                      </TableCell>
                                  ) : (
                                      <TableCell align="center" key={index}>
                                          {value}
                                      </TableCell>
                                  ),
                              )
                            : productVariantTableHeader.map((value, index) =>
                                  index === 0 ? (
                                      <TableCell align="left" key={index}>
                                          {value}
                                      </TableCell>
                                  ) : (
                                      <TableCell align="center" key={index}>
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
                                        'yyyy-MM-dd HH:mm:ss',
                                    ).toString()}
                                </TableCell>
                                <TableCell align="center">
                                    {product.promotion_name
                                        ? product.promotion_name
                                        : 'Không có'}
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
                                                variant="outlined"
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
                                                variant="outlined"
                                                color="primary"
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
                                                variant="outlined"
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
                                    {product.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {product.price}
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
                                                    handleOpenDiaLogPDVariant(
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
            <Stack justifyContent="center" alignItems="center">
                <Typography component="span">Page: {page}</Typography>
                <Pagination
                    count={
                        products.stateTable === 'product'
                            ? products.totalPage
                            : productVariant.totalPage
                    }
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
            <DialogProductAttribute
                open={open}
                productAttributeList={productAttribute.data}
                handleClose={handleClose}
            />
            {openDialogProduct && (
                <DialogProduct
                    open={openDialogProduct}
                    handleClose={handleClosedialogProduct}
                    id={idSelected}
                    products={products.productById}
                    productAttributeList={[]}
                />
            )}
        </Box>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
    getProductsList: PropTypes.func.isRequired,
    getProductVariant: PropTypes.func.isRequired,
    productAttribute: state.productAttribute,
    getProductAttribute: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getProductById: PropTypes.func.isRequired,
    changeStateTable: PropTypes.func.isRequired,
    productVariant: state.productVariant,
    deleteProductVariant: state.productVariant,
});
export default connect(mapStateToProps, {
    getProductVariant,
    getProductsList,
    getProductAttribute,
    deleteProduct,
    getProductById,
    deleteProductVariant,
    changeStateTable,
})(SimpleTable);
