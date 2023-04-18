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
    // TextField,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from 'react';
import {
    HANDLE_RESET_CATEGORY,
    getCategory,
    handleChangeCategory,
    handleChangeSubcategory,
} from 'app/redux/actions/CategoryAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { handleChangeBrand, getAllBrand } from 'app/redux/actions/BrandAction';
import {
    getAllPromotion,
    handleChangePromotion,
} from 'app/redux/actions/PromotionAction';
import DialogConfirm from './DialogConfirm';
import axios from 'axios.js';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

export const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}));
export const deleteFieldNotBelongProductForm = (form) => {
    delete form.category_parent;
};
function DialogCreateProduct({ open, handleClose, ...props }) {
    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const handleClickOpenConfirm = (event) => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    // const [category, setCategory] = useState([{}]);
    const [formProduct, setFormProduct] = useState({
        product_name: '',
        category_id: '',
        brand_id: '',
        promotion_id: '',
        image: '',
        description: '',
        id: '',
        category_parent: '',
    });

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
        getCategory,
        categories,
        brands,
        promotions,
        getAllPromotion,
        handleChangeCategory,
        handleChangeSubcategory,
        handleChangeBrand,
        handleChangePromotion,
        getAllBrand,
    } = props;

    useEffect(() => {
        getCategory();
        getAllBrand();
        getAllPromotion();
        // eslint-disable-next-line
        return () => {
            dispatch({
                type: HANDLE_RESET_CATEGORY,
            });
        };
        // eslint-disable-next-line
    }, []);

    const handleClickCategory = (e, value) => {
        setFormProduct((pre) => {
            return {
                ...pre,
                category_parent: value.category_name,
            };
        });
        if (value === null) {
            return;
        }
        let filterCategoryStore = categories.data.filter((obj) => {
            return obj.id === value.category_id;
        });
        let subCategory = [];

        filterCategoryStore[0].categories.map((item) => {
            return subCategory.push({
                category_name: item.category_name,
                category_id: item.id,
            });
        });
        handleChangeCategory(value, subCategory);
        handleChangeFormProduct('', 'category_id');
    };

    const handleClickSubCategory = (e, value) => {
        if (value === null || value === undefined) {
            return;
        }

        handleChangeSubcategory(value);
        handleChangeFormProduct(value.category_id, 'category_id');
    };

    const handleClickBrand = (e, value) => {
        if (value === null || value === undefined) {
            return;
        }
        handleChangeBrand(value);
        handleChangeFormProduct(value.brand_id, 'brand_id');
    };
    const handleClickPromotion = (e, value) => {
        if (value === null || value === undefined) {
            return;
        }
        handleChangePromotion(value);
        handleChangeFormProduct(value.promotion_id, 'promotion_id');
    };

    const handleConfirmUpdate = async () => {
        deleteFieldNotBelongProductForm(formProduct);
        setLoad(true);
        var productResponse = {};
        await axios
            .post(
                process.env.REACT_APP_BASE_URL + 'product',

                formProduct,
            )
            .then((res) => {
                productResponse = res.data;
            });
        if (file) {
            let blob = file.slice(0, file.size, 'image/png');
            let newFile = new File([blob], productResponse.image, {
                type: 'image/png',
            });
            const formData = new FormData();
            formData.append('file', newFile);
            await axios.post(
                process.env.REACT_APP_BASE_URL_API_FILE,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
        }

        setLoad(false);
        setOpenSnackBar(true);
        setOpenConfirm(false);
    };
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    console.log();
    const handleChangeFormProduct = (value, name) => {
        setFormProduct((pre) => {
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
                <ValidatorForm
                    onSubmit={handleClickOpenConfirm}
                    onError={(errors) => console.log(errors)}
                >
                    <DialogContent>
                        {/* <DialogContentText>Biểu mẫu sản phẩm</DialogContentText> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Tên sản phẩm"
                                    type="text"
                                    fullWidth
                                    // value={
                                    //     formProduct.product_name === ''
                                    //         ? products.product_name === undefined
                                    //         : ''
                                    //         ? products.product_name
                                    //         : formProduct.product_name || ''
                                    // }
                                    name="productName"
                                    value={formProduct.product_name || ''}
                                    onChange={(e) => {
                                        handleChangeFormProduct(
                                            e.target.value || '',
                                            'product_name',
                                        );
                                    }}
                                    validators={[
                                        'required',
                                        'minStringLength: 4',
                                    ]}
                                    errorMessages={[
                                        'Không được bỏ trống',
                                        'Tối thiểu 4 ký tự',
                                    ]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} marginTop={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    getOptionLabel={(option) =>
                                        typeof option === 'string'
                                            ? option ?? ''
                                            : option.category_name ?? ''
                                    }
                                    options={
                                        categories.categoryFilterNotChildren
                                    }
                                    onChange={(e, value) => {
                                        handleClickCategory(e, value);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        option.category_name ===
                                        value.category_name
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formProduct.category_parent}
                                            validators={['required']}
                                            errorMessages={['Vui lòng chọn']}
                                            label="Danh mục"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disableClearable
                                    id="combo-box-demo"
                                    options={categories.subCategoryListProduct}
                                    getOptionLabel={(option) =>
                                        option.category_name || ''
                                    }
                                    onChange={(e, value) => {
                                        handleClickSubCategory(e, value);
                                    }}
                                    value={categories.subCategoryOfProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={
                                                categories.subCategoryOfProduct
                                            }
                                            validators={['required']}
                                            errorMessages={['Vui lòng chọn']}
                                            label="Danh mục con"
                                        />
                                    )}
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
                                    options={brands.data}
                                    getOptionLabel={(option) =>
                                        typeof option === 'string'
                                            ? option ?? ''
                                            : option.brand_name ?? ''
                                    }
                                    onChange={(e, value) => {
                                        handleClickBrand(e, value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Thuơng hiệu"
                                            value={formProduct.brand_id}
                                            validators={['required']}
                                            errorMessages={['Vui lòng chọn']}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    // disablePortal
                                    disableClearable
                                    id="combo-box-demo"
                                    options={[
                                        {
                                            promotion_name:
                                                'Không có khuyến mãi',
                                            promotion_id: '',
                                        },
                                        ...promotions.data,
                                    ]}
                                    getOptionLabel={(option) =>
                                        typeof option === 'string'
                                            ? option ?? ''
                                            : option.promotion_name ?? ''
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                        option.promotion_id ===
                                        value.promotion_id
                                    }
                                    onChange={(e, value) => {
                                        handleClickPromotion(e, value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            key={params.promotion_id}
                                            label="Khuyến mãi"
                                        />
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
                                        accept="image/*"
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
                                        <AddAPhotoIcon
                                            sx={{ marginRight: 1 }}
                                        />{' '}
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

                                    // key={new Date().getTime().toString()}
                                />
                            </Grid>
                        </Grid>

                        <Grid container marginTop={2}>
                            <Grid item xs={12}>
                                <TextField
                                    placeholder="Mô tả tổng quan sản phẩm"
                                    multiline
                                    label="Mô tả tổng quan sản phẩm"
                                    rows={8}
                                    // minRows={8}
                                    fullWidth
                                    value={formProduct.description}
                                    onChange={(e) => {
                                        handleChangeFormProduct(
                                            e.target.value,
                                            'description',
                                        );
                                    }}
                                    validators={[
                                        'required',
                                        'minStringLength: 10',
                                    ]}
                                    errorMessages={[
                                        'Không được bỏ trống',
                                        'Tối thiểu 10 ký tự',
                                    ]}
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
                            // onClick={handleClickOpenConfirm}
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            Cập nhật
                        </Button>
                    </DialogActions>
                </ValidatorForm>
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
        </Box>
    );
}

const mapStateToProps = (state) => ({
    brands: state.brands,
    promotions: state.promotions,
    categories: state.categories,
    getCategory: PropTypes.func.isRequired,
    getAllPromotion: PropTypes.func.isRequired,
    handleChangeCategory: PropTypes.func.isRequired,
    handleChangeSubcategory: PropTypes.func.isRequired,
    handleChangeBrand: PropTypes.func.isRequired,
    handleChangePromotion: PropTypes.func.isRequired,
    getAllBrand: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
    getCategory,
    getAllPromotion,
    handleChangeCategory,
    handleChangeSubcategory,
    handleChangeBrand,
    handleChangePromotion,
    getAllBrand,
})(DialogCreateProduct);
