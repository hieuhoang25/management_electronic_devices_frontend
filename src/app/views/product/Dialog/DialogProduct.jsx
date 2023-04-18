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
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from 'react';
import {
    getCategory,
    getCategoryShowProduct,
    handleChangeCategory,
    handleChangeSubcategory,
} from 'app/redux/actions/CategoryAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    getBrandProduct,
    handleChangeBrand,
} from 'app/redux/actions/BrandAction';
import {
    getPromotionProductWithPromotionId,
    handleChangePromotion,
} from 'app/redux/actions/PromotionAction';
import DialogConfirm from './DialogConfirm';
import { putProduct } from 'app/redux/actions/ProductAction';
import axios from 'axios.js';
import { v4 as uuidv4 } from 'uuid';
import { TextField } from './DialogCreateProduct';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { deleteFieldNotBelongProductForm } from './DialogCreateProduct';
function DialogProduct({
    open,
    products = {},
    handleClose,

    ...props
}) {
    const [image, setImage] = useState();
    const [file, setFile] = useState({});
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [load, setLoad] = useState(false);
    const handleClickOpenConfirm = () => {
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
        let blob = file.slice(0, file.size, 'image/png');
        let newFile = new File([blob], formProduct.image, {
            type: 'image/png',
        });
        const formData = new FormData();
        formData.append('file', newFile);

        setFile(formData);
        setImage(URL.createObjectURL(file));
    };

    const {
        getCategory,
        categories,
        brands,
        getBrandProduct,
        promotions,
        getPromotionProductWithPromotionId,
        getCategoryShowProduct,
        handleChangeCategory,
        handleChangeSubcategory,
        putProduct,
        handleChangeBrand,
        handleChangePromotion,
    } = props;

    useEffect(() => {
        getCategory();

        if (Object.keys(products).length !== 0) {
            setImage(
                process.env.REACT_APP_BASE_URL_FIREBASE +
                    products.image +
                    '?alt=media&token=' +
                    uuidv4(),
            );
            setFormProduct({
                product_name: products.product_name,
                category_id: products.category_id,
                brand_id: products.brand_id,
                promotion_id: products.promotion_id,
                image: products.image,
                description: products.description,
                id: products.id,
                is_delete: products.is_delete,
            });
            getBrandProduct(products.brand_id);
            getPromotionProductWithPromotionId(products.promotion_id);
            getCategoryShowProduct(products.category_id);
            // setSubCategory(categories.subCategoryListProduct);
        }
        // eslint-disable-next-line
    }, [products]);
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
        await putProduct(formProduct);

        await axios
            .post(process.env.REACT_APP_BASE_URL_API_FILE, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setImage(
            process.env.REACT_APP_BASE_URL_FIREBASE +
                products.image +
                '?alt=media&token=' +
                uuidv4(),
        );
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
                                        option.category_id === value.category_id
                                    }
                                    value={categories.categoryOfProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Danh mục"
                                            value={categories.categoryOfProduct}
                                            validators={['required']}
                                            errorMessages={['Vui lòng chọn']}
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
                                    isOptionEqualToValue={(option, value) =>
                                        option.category_id === value.category_id
                                    }
                                    value={categories.subCategoryOfProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Danh mục con"
                                            value={
                                                categories.subCategoryOfProduct
                                            }
                                            validators={['required']}
                                            errorMessages={['Vui lòng chọn']}
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
                                    options={brands.brandFilterOfProduct}
                                    // getOptionLabel={(option) => option.brand_name}
                                    getOptionLabel={(option) =>
                                        typeof option === 'string'
                                            ? option ?? ''
                                            : option.brand_name ?? ''
                                    }
                                    value={brands.brandOfProduct}
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
                                    isOptionEqualToValue={(option, value) =>
                                        option.brand_id === value.brand_id
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    // disablePortal
                                    disableClearable
                                    id="combo-box-demo"
                                    // options={promotions.promotionFilterOfProduct}
                                    options={[
                                        {
                                            promotion_name:
                                                'Không có khuyến mãi',
                                            promotion_id: '',
                                        },
                                        ...promotions.promotionFilterOfProduct,
                                    ]}
                                    getOptionLabel={(option) =>
                                        typeof option === 'string'
                                            ? option ?? ''
                                            : option.promotion_name ?? ''
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                        option.promotion_name ===
                                        value.promotion_name
                                    }
                                    value={
                                        promotions.promotionOfProduct || {
                                            promotion_name:
                                                'Không có khuyến mãi',
                                            promotion_id: '',
                                        }
                                    }
                                    onChange={(e, value) => {
                                        handleClickPromotion(e, value);
                                        // handleChangeFormProduct(
                                        //     value.promotion_id || '',
                                        //     'promotion_id',
                                        // );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
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
                                    key={new Date().getTime().toString()}
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
                                    value={
                                        formProduct.description === ''
                                            ? products.description === undefined
                                                ? ''
                                                : products.description
                                            : formProduct.description
                                    }
                                    onChange={(e) => {
                                        handleChangeFormProduct(
                                            e.target.value || ' ',
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
    getBrandProduct: PropTypes.func.isRequired,
    getPromotionProductWithPromotionId: PropTypes.func.isRequired,
    getCategoryShowProduct: PropTypes.func.isRequired,
    handleChangeCategory: PropTypes.func.isRequired,
    handleChangeSubcategory: PropTypes.func.isRequired,
    putProduct: PropTypes.func.isRequired,
    handleChangeBrand: PropTypes.func.isRequired,
    handleChangePromotion: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
    getCategory,
    getBrandProduct,
    getPromotionProductWithPromotionId,
    getCategoryShowProduct,
    handleChangeCategory,
    handleChangeSubcategory,
    putProduct,
    handleChangeBrand,
    handleChangePromotion,
})(DialogProduct);
