// import { TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { TextValidator } from 'react-material-ui-form-validator';
import {
    Autocomplete,
    Button,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    Icon,
    styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    ProductForm,
    StatusDisable,
} from 'app/redux/actions/ProductFormAction';
import { cate } from './FormStepper1';
import ListProductVariant from './ListProductVariant';

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
const filter = createFilterOptions();
function FormStepper2(props) {
    const { ProductForm, productForm, StatusDisable } = props;
    const [newProduct, setNewProduct] = useState(productForm.formProduct);
    const [disableSubcatagory, setDisableSubcatagory] = useState(true);
    const ObjectNull = { name: '', category: '', subcategory: '' };
    const [value, setValue] = useState(null);
    const [open, toggleOpen] = useState(false);

    // const handleChange = (input, value) => {
    //     StatusDisable(true);
    //     setNewProduct({ ...newProduct, [input]: value });
    // };
    const handleClear = () => {
        ProductForm({
            ObjectNull,
        });
        setNewProduct(ObjectNull);
        StatusDisable(true);
    };

    console.log(disableSubcatagory);
    const handleClose = () => {
        setDialogValue({
            label: '',
            year: '',
        });
        toggleOpen(false);
    };
    const [dialogValue, setDialogValue] = useState({
        label: '',
        year: '',
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            label: dialogValue.label,
            year: parseInt(dialogValue.year, 10),
        });
        handleClose();
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
            <Grid item xs={12} marginTop={2} marginBottom={1}>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                                toggleOpen(true);
                                setDialogValue({
                                    label: newValue,
                                    year: '',
                                });
                            }, 500);
                        } else if (newValue && newValue.inputValue) {
                            toggleOpen(true);
                            setDialogValue({
                                label: newValue.inputValue,
                                year: '',
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        console.log(filtered);
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                label: `Thêm "${params.inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={cate}
                    getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.label;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                        <li {...props}>{option.label}</li>
                    )}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Thêm " />
                    )}
                />
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Tạo thuộc tính mới</DialogTitle>
                        <DialogContent>
                            <DialogContentText>...</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                value={dialogValue.label}
                                onChange={(event) =>
                                    setDialogValue({
                                        ...dialogValue,
                                        label: event.target.value,
                                    })
                                }
                                label="Tên thuộc tính"
                                type="text"
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                id="Giá trị"
                                value={dialogValue.year}
                                onChange={(event) =>
                                    setDialogValue({
                                        ...dialogValue,
                                        year: event.target.value,
                                    })
                                }
                                label="Giá trị"
                                type="number"
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Grid>
            <Grid
                justify="space-between"
                alignItems="center"
                display="inline-flex"
                ml={1}
                mt={1}
            >
                <TextField
                    id="outlined-basic"
                    label="Số lượng sản phẩm"
                    variant="outlined"
                    value={1}
                    disabled
                    inputProps={{
                        style: { fontWeight: 'bold' },
                    }}
                />
                <Grid item mb={2}>
                    <Fab
                        color="success"
                        aria-label="Add"
                        className="button"
                        type="submit"
                        size="small"
                    >
                        <Icon>add</Icon>
                    </Fab>
                    <Fab
                        color="secondary"
                        aria-label="Add"
                        className="button"
                        type="submit"
                        size="small"
                    >
                        <Icon>remove</Icon>
                    </Fab>
                </Grid>
            </Grid>

            <ListProductVariant />

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
    FormStepper2,
);
