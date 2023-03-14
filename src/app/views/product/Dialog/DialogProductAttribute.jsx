import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import ButtonProduct from '../ButtonProduct';
import {
    addIdToStore,
    getProductAttribute,
    deleteProductAttribute,
    resetProductAttribute,
    addNewForm,
    createProductAttribute,
    updateProductAttribute,
    updateProductAtbInStore,
} from 'app/redux/actions/ProductAttributeAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import DialogConfirm from './DialogConfirm';

function DialogProductAttribute({
    open,
    productAttributeList,
    handleClose,
    ...props
}) {
    const {
        addIdToStore,
        productAttribute,
        getProductAttribute,
        deleteProductAttribute,
        createProductAttribute,
        updateProductAttribute,
        updateProductAtbInStore,
    } = props;
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleAddIdToListDelete = (id) => {
        addIdToStore(id);
    };
    const handleReset = (idProduct) => {
        getProductAttribute(idProduct);
    };
    const handleConfirmUpdate = async () => {
        await deleteProductAttribute(productAttribute.listIdToDelete);
        await updateProductAttribute(productAttribute.data);
        console.log(productAttribute.data);
        setOpenSnackBar(true);
        setOpenConfirm(false);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const [formAttribute, setFormAttribute] = useState({
        attribute_name: '',
        attribute_value: '',
        product_id: productAttribute.idProduct,
    });
    const handleAddFormAttribute = (e, name) => {
        setFormAttribute((pre) => ({
            ...pre,
            [name]: e.target.value,
            product_id: productAttribute.idProduct,
        }));
    };
    const handleClickCreateAttribute = async () => {
        const check = checkValidation(formAttribute);
        if (check) {
            return;
        }
        await createProductAttribute(formAttribute);
        await getProductAttribute(productAttribute.idProduct);

        clearFormProductAttribute();
    };
    const clearFormProductAttribute = () => {
        setFormAttribute((pre) => ({
            ...pre,
            attribute_name: '',
            attribute_value: '',
        }));
        setValidate((...pre) => ({
            error: false,
            errorMessage: '',
            attribute_name: false,
            attribute_value: false,
        }));
        getProductAttribute(productAttribute.idProduct);
    };

    const [validate, setValidate] = useState({
        error: false,
        errorMessage: '',
        attribute_name: false,
        attribute_value: false,
    });
    const checkValidation = (value) => {
        var check = false;
        //checkNull
        if (value.attribute_name.length === 0) {
            setValidate((pre) => ({
                ...pre,
                error: true,
                errorMessage: 'Không được bỏ trống',
                attribute_name: true,
            }));
            check = true;
        }
        if (value.attribute_value.length === 0) {
            setValidate((pre) => ({
                ...pre,
                error: true,
                errorMessage: 'Không được bỏ trống',
                attribute_value: true,
            }));
            check = true;
        }
        return check;
    };
    const handleChangeFormValue = (id, e) => {
        console.log(typeof e.target.value);
        updateProductAtbInStore(id, e.target.value);
    };

    return (
        <>
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
                        >
                            <Grid item xs={5}>
                                Hướng dẫn : Nhập tên thuộc tính sau đó click tạo
                                để thêm 1 ô giá trị thuộc tính ở bên dưới
                            </Grid>
                            <Grid
                                container
                                item
                                xs={7}
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        margin="dense"
                                        id="name"
                                        label="Tên"
                                        type="text"
                                        value={
                                            formAttribute.attribute_name || ''
                                        }
                                        onChange={(e) => {
                                            handleAddFormAttribute(
                                                e,
                                                'attribute_name',
                                            );
                                        }}
                                        error={validate.attribute_value}
                                        helperText={validate.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        margin="dense"
                                        id="name"
                                        label="Giá trị"
                                        type="text"
                                        error={validate.attribute_value}
                                        helperText={validate.errorMessage}
                                        value={
                                            formAttribute.attribute_value || ''
                                        }
                                        onChange={(e) => {
                                            handleAddFormAttribute(
                                                e,
                                                'attribute_value',
                                            );
                                        }}
                                        FormHelperTextProps={{
                                            style: {
                                                backgroundColor: 'transparent',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <ButtonProduct
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleClickCreateAttribute}
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
                        {productAttribute.data.map((productAtb, index) => (
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
                                        label={productAtb.attribute_name}
                                        type="text"
                                        fullWidth
                                        value={productAtb.attribute_value || ''}
                                        onChange={(e) => {
                                            handleChangeFormValue(
                                                productAtb.id,
                                                e,
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        key={index}
                                        className="button"
                                        aria-label="Delete"
                                        onClick={() => {
                                            handleAddIdToListDelete(
                                                productAtb.id,
                                            );
                                        }}
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
                        variant="outlined"
                        color="error"
                        disabled={
                            productAttributeList.length === 0 ? true : false
                        }
                        onClick={() => {
                            handleReset(productAttributeList[0].product_id);
                        }}
                    >
                        Khôi phục
                    </Button>
                    <Button
                        onClick={handleClickOpenConfirm}
                        variant="outlined"
                        color="primary"
                    >
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>

            {/* dialog confirm  */}
            {/* <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title" color="primary">
                    {'XÁC NHẬN'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận cập nhật các thay đổi thông số của sản phẩm ,
                        điều nay sẽ không hoàn tác được sau khi đã xác nhận
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Huỷ bỏ</Button>
                    <Button onClick={handleConfirmUpdate} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog> */}
            <DialogConfirm
                openConfirm={openConfirm}
                handleClose={handleClose}
                handleCloseConfirm={handleCloseConfirm}
                handleConfirmUpdate={handleConfirmUpdate}
            />
            {/* SnackBar */}
            <Snackbar
                open={openSnackBar}
                autoHideDuration={1500}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                    md={{ width: '100%' }}
                >
                    Cập nhật thành công
                </Alert>
            </Snackbar>
        </>
    );
}
const mapStateToProps = (state) => ({
    productAttribute: state.productAttribute,
    addIdToStore: PropTypes.func.isRequired,
    getProductAttribute: PropTypes.func.isRequired,
    deleteProductAttribute: PropTypes.func.isRequired,
    resetProductAttribute: PropTypes.func.isRequired,
    addNewForm: PropTypes.func.isRequired,
    createProductAttribute: PropTypes.func.isRequired,
    updateProductAttribute: PropTypes.func.isRequired,
    updateProductAtbInStore: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, {
    addIdToStore,
    getProductAttribute,
    deleteProductAttribute,
    resetProductAttribute,
    addNewForm,
    createProductAttribute,
    updateProductAttribute,
    updateProductAtbInStore,
})(DialogProductAttribute);
