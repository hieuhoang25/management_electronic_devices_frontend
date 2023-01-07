// import { TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { TextValidator } from 'react-material-ui-form-validator';
import { AutoComplete } from '../../material-kit/auto-complete/AsyncAutocomplete';
import { Fab, Icon, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { ProductForm, StatusDisable } from 'app/redux/actions/ProductAction';
import { SimpleCard } from 'app/components';
export const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}));
function FormStepper1(props) {
    const { ProductForm, products, StatusDisable } = props;
    const [newProduct, setNewProduct] = useState(products.formProduct);
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
        ProductForm(products.formProduct);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //thêm mới vào productform khi có thay đổi từ state
    useEffect(() => {
        ProductForm(newProduct);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newProduct]);
    console.log(products);

    return (
        <Grid2 container spacing={3} mt={1} justify="space-between">
            {/* tên sản phẩm */}
            <Grid2 xs={6} md={4}>
                <TextField
                    onChange={(e) => handleChange('name', e.target.value)}
                    id="outlined-required"
                    label="Tên sản phẩm"
                    placeholder="Nhập tên sản phẩm muốn tạo"
                    fullWidth
                    type="text"
                    value={newProduct.name}
                    errorMessages={[
                        'this field is required',
                        'Tối thiểu 4 ký tự',
                    ]}
                    validators={[
                        'required',
                        'minStringLength: 4',
                        'maxStringLength: 9',
                    ]}
                />
            </Grid2>
            {/* Loại sản phẩm */}
            <Grid2 xs={6} md={4}>
                <AutoComplete
                    onChange={(event, value) => handleChange('category', value)}
                    required
                    options={suggestions}
                    filterSelectedOptions
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            type="text"
                            label="Loại sản phẩm"
                            variant="outlined"
                            fullWidth
                            // errorMessages={['this field is required']}
                            // validators={['required']}
                        />
                    )}
                />
            </Grid2>
            {/* sản phẩm chi tiết */}
            <Grid2 xs={12} md={4}>
                <AutoComplete
                    onChange={(event, value) =>
                        handleChange('subCategory', value)
                    }
                    required
                    disabled
                    options={suggestions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Sản phẩm chi tiết"
                            variant="outlined"
                            fullWidth
                            // errorMessages={['this field is required']}
                            // validators={['required']}
                        />
                    )}
                />
            </Grid2>
            <SimpleCard>
                {/* <Grid2 item xs={1} mdOffset={10}> */}
                <Fab
                    color="primary"
                    aria-label="Add"
                    className="button"
                    style={{ float: 'right' }}
                    type="submit"
                    // onClick={handleSubmit}
                >
                    <Icon>save</Icon>
                </Fab>
                <Fab
                    color="primary"
                    aria-label="Add"
                    className="button"
                    style={{ float: 'left' }}
                    type="reset"
                    onClick={handleClear}
                >
                    <Icon>clear</Icon>
                </Fab>
                {/* </Grid2> */}
            </SimpleCard>
        </Grid2>
    );
}
const mapStateToProps = (state) => ({
    ProductForm: PropTypes.func.isRequired,
    products: state.products,
    StatusDisable: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, { ProductForm, StatusDisable })(
    FormStepper1,
);
