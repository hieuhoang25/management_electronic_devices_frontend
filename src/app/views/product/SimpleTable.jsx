import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    Pagination,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {
    productTableHeader,
    productVariantTableHeader,
} from 'app/utils/constant';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { format, parseISO } from 'date-fns';
import {
    getProductsList,
    getProductVariant,
    getProductAttributeList,
} from 'app/redux/actions/ProductAction';
import ButtonProduct from './ButtonProduct';

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));

const SimpleTable = (props) => {
    const {
        getProductsList,
        products,
        getProductVariant,
        getProductAttributeList,
    } = props;
    if (!products.listProduct.data) {
        products.listProduct.data = [];
    }
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        if (products.stateTable === 'product') {
            getProductsList(5, value - 1);
        } else {
            getProductVariant(1, value - 1, products.productId);
        }
        setPage(value);
    };
    const handleClickShowDetail = (id) => {
        getProductVariant(1, 0, id);
    };
    useEffect(() => {
        if (products.stateTable === 'product') {
            getProductsList(5, 0);
        }
        return () => {};

        // eslint-disable-next-line
    }, [getProductsList]);
    const [open, setOpen] = useState(false);
    function handleClickOpen(id) {
        getProductAttributeList(id);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    console.log(products);
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
                                <TableCell align="center">
                                    {product.is_delete ? 'true' : 'false'}
                                </TableCell>
                                <TableCell align="center">
                                    {/* <IconButton
                                        onClick={() => {
                                            handleClickShowDetail(product.id);
                                        }}
                                    >
                                        <Icon color="primary">visibility</Icon>
                                    </IconButton> */}
                                    <Grid>
                                        <ButtonProduct
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            onClick={() => {
                                                handleClickOpen(product.id);
                                            }}
                                        >
                                            Thông số
                                        </ButtonProduct>

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
                                </TableCell>
                            </TableRow>
                        ))
                    ) : //product_variant
                    products.listProductVariant.length === 0 ? (
                        <></>
                    ) : (
                        products.listProductVariant.data.map(
                            (product, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {product.sku_name}
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
                                        {product.status}
                                    </TableCell>
                                </TableRow>
                            ),
                        )
                    )}
                </TableBody>
            </StyledTable>
            <Stack justifyContent="center" alignItems="center">
                <Typography component="span">Page: {page}</Typography>
                <Pagination
                    count={products.totalPage}
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
            {/* dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Thông số sản phẩm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText component="span">
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            marginBottom={2}
                        >
                            <Grid item xs={7}>
                                Hướng dẫn : Nhập tên thuộc tính sau đó click tạo
                                để thêm 1 ô giá trị thuộc tính ở bên dưới
                            </Grid>
                            <Grid
                                container
                                item
                                xs={5}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={8}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Tên thuộc tính"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <ButtonProduct
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        Tạo
                                    </ButtonProduct>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography
                            borderBottom="double"
                            marginBottom={2}
                        ></Typography>
                    </DialogContentText>

                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {products.listProductAttribute.map((product, index) => (
                            <Grid
                                container
                                item
                                xs={4}
                                justifyContent="center"
                                alignItems="center"
                                key={index}
                            >
                                <Grid item xs={10}>
                                    <TextField
                                        key={index}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label={product.attribute_name}
                                        type="text"
                                        fullWidth
                                        value={product.attribute_value}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        key={index}
                                        className="button"
                                        aria-label="Delete"
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={handleClose}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="primary"
                    >
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    getProductsList: PropTypes.func.isRequired,
    getProductVariant: PropTypes.func.isRequired,
    products: state.products,
    getProductAttributeList: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, {
    getProductVariant,
    getProductsList,
    getProductAttributeList,
})(SimpleTable);
