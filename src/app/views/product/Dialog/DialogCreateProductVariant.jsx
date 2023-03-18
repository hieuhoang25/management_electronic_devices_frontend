import {
    Alert,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Snackbar,
    TextField,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAllColor, handleChangeColor } from 'app/redux/actions/ColorAction';
import {
    getAllStorage,
    handleChangeStorage,
} from 'app/redux/actions/StorageAction';
import DialogConfirm from './DialogConfirm';
import axios from 'axios.js';
import { v4 as uuidv4 } from 'uuid';
import NumericFormatCustom from '../NumericFormatCustom';

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
function DialogCreateProductVariant({
    open,
    products = {},
    handleClose,
    ...props
}) {
    const [image, setImage] = useState({});
    const [file, setFile] = useState();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [load, setLoad] = useState(false);
    const [formProductVariant, setFormProductVariant] = useState({
        color_id: '',
        display_name: '',
        price: '',
        sku_name: '',
        storage_id: '',
        quantity: '',
        product_id: '',
        image: '',
    });
    const [typeOfSeverity, setTypeOfSeverity] = useState('success');
    const [messageSnackbar, setMessageSnackbar] = useState(
        'Cập nhật thành công',
    );
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    //clean up img
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image);
        };
    }, [image]);
    const handleUpload = (e) => {
        const file = e.target.files[0];

        setFile(file);
        setImage(URL.createObjectURL(file));
    };

    const {
        getAllColor,
        getAllStorage,
        color,
        storage,
        handleChangeColor,
        handleChangeStorage,
        productVariant,
    } = props;

    useEffect(() => {
        console.log('reload');
        getAllColor();
        getAllStorage();
        setImage(
            process.env.REACT_APP_BASE_URL_FIREBASE +
                formProductVariant.image +
                '?alt=media&token=' +
                uuidv4(),
        );
        setFormProductVariant((pre) => {
            return {
                ...pre,
                product_id: productVariant.product_id,
            };
        });

        // eslint-disable-next-line
    }, []);

    const handleClickAutoComplete = (e, value, name) => {
        if (value === null || value === undefined) {
            return;
        }
        if (name === 'color') {
            handleChangeColor({
                color_name: value.color_name,
                color_id: value.color_id,
            });
            handleChangeForm(value.color_id, 'color_id');
        } else if (name === 'storage') {
            handleChangeStorage({
                storage_name: value.storage_name,
                storage_id: value.storage_id,
            });
            handleChangeForm(value.storage_id, 'storage_id');
        }
    };

    const checkErrorMessage = (errorMessage) => {
        if (errorMessage) {
            setMessageSnackbar(errorMessage);
            setTypeOfSeverity('error');
            setLoad(false);
            setOpenSnackBar(true);
            setOpenConfirm(false);
            return true;
        }
        return false;
    };
    const handleConfirmUpdate = async () => {
        setLoad(true);
        var errorMessage;
        var productVariantResponse = {};
        await axios
            .post(
                process.env.REACT_APP_BASE_URL + 'product-variant',
                formProductVariant,
            )
            .then((res) => (productVariantResponse = res.data))
            .catch((error) => (errorMessage = error));
        console.log(productVariantResponse);

        try {
            console.log(file);
            let blob = file.slice(0, file.size, 'image/png');
            let newFile = new File([blob], productVariantResponse.image, {
                type: 'image/png',
            });
            const formData = new FormData();
            formData.append('file', newFile);
            await axios
                .post(process.env.REACT_APP_BASE_URL_API_FILE, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    // console.log(response.data);
                })
                .catch((error) => {
                    errorMessage = error;
                });
        } catch (error) {
            console.log('upload file dialogcreate productvariant : ' + error);
        }

        let check = checkErrorMessage(errorMessage);
        if (check) {
            return;
        }

        setLoad(false);
        setMessageSnackbar('Cập nhật thành công');
        setTypeOfSeverity('success');
        setOpenSnackBar(true);
        setOpenConfirm(false);
    };
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const handleChangeForm = (value, name) => {
        console.log(value);
        setFormProductVariant((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Biểu mẫu</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Biểu mẫu sản phẩm</DialogContentText> */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Tên SKU"
                                fullWidth
                                value={formProductVariant.sku_name || ''}
                                onChange={(e) => {
                                    handleChangeForm(
                                        e.target.value || '',
                                        'sku_name',
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Tên hiển thị sản phẩm"
                                fullWidth
                                value={formProductVariant.display_name || ''}
                                onChange={(e) => {
                                    handleChangeForm(
                                        e.target.value || '',
                                        'display_name',
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                id="number"
                                label="Số lượng"
                                type="number"
                                fullWidth
                                value={formProductVariant.quantity || ''}
                                onChange={(e) => {
                                    handleChangeForm(
                                        e.target.value || '',
                                        'quantity',
                                    );
                                }}
                                helperText=" "
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <TextField
                                margin="dense"
                                id="name"
                                label="Giá"
                                type="text"
                                fullWidth
                                value={formProductVariant.price || ''}
                                onChange={(e) => {
                                    handleChangeForm(
                                        e.target.value || '',
                                        'price',
                                    );
                                }}
                            /> */}
                            <TextField
                                label="Giá"
                                value={formProductVariant.price || ''}
                                onChange={(e) => {
                                    handleChangeForm(
                                        e.target.value || '',
                                        'price',
                                    );
                                }}
                                fullWidth
                                name="numberformat"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumericFormatCustom,
                                }}
                                helperText=""
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                // disablePortal
                                disableClearable
                                disablePortal
                                id="combo-box-demo"
                                options={[
                                    {
                                        color_name: 'Không chọn',
                                        color_id: '',
                                    },
                                    ...color.colorFilter,
                                ]}
                                // getOptionLabel={(option) => option.brand_name}
                                getOptionLabel={(option) =>
                                    typeof option === 'string'
                                        ? option ?? ''
                                        : option.color_name ?? ''
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                value={
                                    Object.keys(color.colorSelected).length ===
                                    0
                                        ? {
                                              color_name:
                                                  formProductVariant.color_name,
                                              color_id:
                                                  formProductVariant.color_id,
                                          } || {
                                              color_name: 'Không chọn',
                                              color_id: '',
                                          }
                                        : color.colorSelected
                                }
                                onChange={(e, value) => {
                                    handleClickAutoComplete(e, value, 'color');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Màu sắc" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                // disablePortal
                                disableClearable
                                disablePortal
                                id="combo-box-demo"
                                options={storage.storageFilter}
                                // getOptionLabel={(option) => option.brand_name}
                                getOptionLabel={(option) =>
                                    typeof option === 'string'
                                        ? option ?? ''
                                        : option.storage_name ?? ''
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                value={
                                    Object.keys(storage.storageSelected)
                                        .length === 0
                                        ? {
                                              storage_name:
                                                  formProductVariant.storage_name,
                                              storage_id:
                                                  formProductVariant.storage_id,
                                          } || {
                                              storage_name: 'Không chọn',
                                              storage_ud: '',
                                          }
                                        : storage.storageSelected
                                }
                                onChange={(e, value) => {
                                    handleClickAutoComplete(
                                        e,
                                        value,
                                        'storage',
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Dung lượng" />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        marginTop={2}
                        spacing={1}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={3}>
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={(e) => {
                                        handleUpload(e);
                                    }}
                                />
                                <Fab
                                    color="warning"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                    sx={{
                                        width: 170,
                                    }}
                                >
                                    <AddAPhotoIcon sx={{ marginRight: 1 }} />{' '}
                                    Upload Image
                                </Fab>
                            </label>
                        </Grid>

                        <Grid
                            item
                            xs={9}
                            justifyContent="revert"
                            alignItems="revert"
                        >
                            <Avatar
                                sx={{ width: 200, height: 200 }}
                                variant="square"
                                alt="Hình ánh sản phẩm"
                                src={image || ''}
                                key={new Date().getTime().toString()}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Huỷ bỏ
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

            <DialogConfirm
                openConfirm={openConfirm}
                handleClose={handleClose}
                handleCloseConfirm={handleCloseConfirm}
                handleConfirmUpdate={handleConfirmUpdate}
                loading={load}
            />

            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity={typeOfSeverity}
                    md={{ width: '100%' }}
                >
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    getAllColor: PropTypes.func.isRequired,
    getAllStorage: PropTypes.func.isRequired,
    color: state.color,
    storage: state.storage,
    handleChangeColor: PropTypes.func.isRequired,
    handleChangeStorage: PropTypes.func.isRequired,
    productVariant: state.productVariant,
});

export default connect(mapStateToProps, {
    getAllColor,
    getAllStorage,
    handleChangeColor,
    handleChangeStorage,
})(DialogCreateProductVariant);
