// import { TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { TextValidator } from 'react-material-ui-form-validator';
import { AutoComplete } from '../../material-kit/auto-complete/AsyncAutocomplete';
import { Fab, Grid, Icon, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    ProductForm,
    StatusDisable,
} from 'app/redux/actions/ProductFormAction';
export const cate = [
    { label: 'Điện thoại' },
    { label: 'Laptop' },
    { label: 'Sạc' },
    { label: 'Máy tính bàn' },
];
export const subCate = [
    { label: 'IPHONE' },
    { label: 'SAMSUNG' },
    { label: 'VINSMART' },
    { label: 'HUWEI' },
    { label: 'OPPO' },
];
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}));
function FormStepper1(props) {
    const { ProductForm, productForm, StatusDisable } = props;
    const [newProduct, setNewProduct] = useState(productForm.formProduct);
    const [disableSubcatagory, setDisableSubcatagory] = useState(true);
    const ObjectNull = { name: '', category: '', subcategory: '' };

    const handleChange = (input, value) => {
        StatusDisable(true);
        setNewProduct({ ...newProduct, [input]: value });
    };
    const handleClear = () => {
        ProductForm({
            ObjectNull,
        });
        setNewProduct(ObjectNull);
        StatusDisable(true);
    };

    //chỉ chạy 1 lần để khởi tạo giá trị ban đầu
    useEffect(() => {
        ProductForm(productForm.formProduct);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //thêm mới vào productform khi có thay đổi từ state
    useEffect(() => {
        //if-else xử lý trạng thái disable khi click vào chọn category
        if (!newProduct.category) {
            setDisableSubcatagory(true);
        } else {
            setDisableSubcatagory(false);
        }
        ProductForm(newProduct);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newProduct]);

    return (
        <Grid2
            container
            spacing={3}
            mt={1}
            justify="space-between"
            alignItems="center"
        >
            {/* tên sản phẩm */}
            <Grid2 xs={6} sm={6} md={4} item>
                <AutoComplete
                    onChange={(event, value) => handleChange('name', value)}
                    value={productForm.formProduct.name || ''}
                    options={cate.map((option) => option.label)}
                    freeSolo
                    aria-required
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            value={productForm.formProduct.name}
                            placeholder="Nhập tên sản phẩm muốn tạo"
                            label="Tên sản phẩm"
                            onChange={(event) =>
                                handleChange('name', event.target.value)
                            }
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 9',
                            ]}
                            errorMessages={[
                                'this field is required',
                                'tối thiểu 4 ký tự ',
                                'tối đa 9 ký tự',
                            ]}
                        />
                    )}
                />
            </Grid2>
            {/* Loại sản phẩm */}
            <Grid2 xs={6} sm={6} item md={4}>
                <AutoComplete
                    onChange={(event, value) => handleChange('category', value)}
                    required
                    options={cate}
                    value={productForm.formProduct.category || null}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            type="text"
                            label="Loại sản phẩm"
                            variant="outlined"
                            fullWidth
                            value={productForm.formProduct.category}
                            errorMessages={['this field is required']}
                            validators={['required']}
                        />
                    )}
                />
            </Grid2>
            {/* sản phẩm chi tiết */}
            <Grid2 xs={6} sm={6} item md={4}>
                <AutoComplete
                    onChange={(event, value) =>
                        handleChange('subCategory', value)
                    }
                    getOptionLabel={(option) => option.label}
                    disabled={disableSubcatagory}
                    options={subCate}
                    value={productForm.formProduct.subCategory || null}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Sản phẩm chi tiết"
                            variant="outlined"
                            fullWidth
                            value={productForm.formProduct.subCategory}
                            errorMessages={['this field is required']}
                            validators={['required']}
                        />
                    )}
                />
            </Grid2>
            <Grid
                container
                spacing={4}
                sx={{ flexDirection: 'row-reverse' }}
                marginRight={5}
            >
                <Grid item>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        className="button"
                        type="submit"
                        // onClick={handleSubmit}
                    >
                        <Icon>save</Icon>
                    </Fab>
                </Grid>

                <Grid item>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        className="button"
                        type="reset"
                        onClick={handleClear}
                    >
                        <Icon>clear</Icon>
                    </Fab>
                </Grid>
            </Grid>
        </Grid2>
    );
}
const mapStateToProps = (state) => ({
    ProductForm: PropTypes.func.isRequired,
    productForm: state.productForm,
    StatusDisable: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, { ProductForm, StatusDisable })(
    FormStepper1,
);
