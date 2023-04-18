import {
    Box,
    TextField,
    Autocomplete,
    Grid,
    Button,
    styled,
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Container as ContainerTable } from '../material-kit/tables/AppTable';
import { connect, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
    changeStateTable,
    handleChangeKeysearch,
    setPageProduct,
    setStateDeleted,
} from 'app/redux/actions/ProductAction';
import { lazy, useEffect, useState } from 'react';
import Loadable from 'app/components/Loadable';
import ButtonProduct from './ButtonProduct';
import DialogCreateProduct from './Dialog/DialogCreateProduct';
import DialogCreateProductVariant from './Dialog/DialogCreateProductVariant';
import {
    clearStateProductVariant,
    getProductVariant,
} from 'app/redux/actions/ProductVariantAction';
import { clearStorageSelected } from 'app/redux/actions/StorageAction';
import { clearColorSelected } from 'app/redux/actions/ColorAction';
import useDebounce from 'app/hooks/useDebounce';
const ProductTable = Loadable(lazy(() => import('./ProductTable')));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));
const isDeleted = [
    { label: 'Hiển thị tất cả', deleted: -1 },
    { label: 'Đã ẩn', deleted: 1 },
    { label: 'Không ẩn', deleted: 0 },
];
const AppProduct = (props) => {
    // eslint-disable-next-line
    const { products, changeStateTable, getProductVariant, productVariant } =
        props;
    const [openFormProduct, setOpenFormProduct] = useState(false);
    const [openDialogProductV, setOenDialogProductV] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [reRender, setReRender] = useState(true);
    const dispatch = useDispatch();

    const handleClickBack = () => {
        changeStateTable('product');
        dispatch(clearStateProductVariant());
    };

    const handleCloseFormProduct = () => {
        setReRender(!reRender);
        setOpenFormProduct(false);
    };
    const handleClickCreate = () => {
        setOpenFormProduct(true);
    };
    const handleClickCreateProductVariant = () => {
        setOenDialogProductV(true);
    };
    const handleCloseDialogCreateProductVariant = () => {
        getProductVariant(
            5,
            productVariant.pageNumber - 1,
            productVariant.product_id,
        );
        dispatch(clearStorageSelected());
        dispatch(clearColorSelected());
        setOenDialogProductV(false);
    };
    const handleChangeStateDeleted = (value) => {
        dispatch(setPageProduct(1));
        dispatch(setStateDeleted(value));
    };

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    };
    const debouncedValue = useDebounce(searchValue, 700);
    useEffect(() => {
        dispatch(setPageProduct(1));
        dispatch(handleChangeKeysearch(debouncedValue));
        // eslint-disable-next-line
    }, [debouncedValue]);
    return (
        <ContainerTable>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={products.breadCrum.data} />
            </Box>
            {products.stateTable === 'product' ? (
                <SimpleCard title="Danh sách sản phẩm">
                    <Grid
                        container
                        flex={1}
                        // direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        mb={2}
                    >
                        <Grid xs={7} item>
                            <TextField
                                // margin="normal"

                                id="outlined-required"
                                label="Tìm kiếm theo tên, thương hiệu, danh mục, khuyến mãi"
                                placeholder="Tìm kiếm theo tên, thương hiệu, danh mục, khuyến mãi"
                                fullWidth
                                onChange={handleChangeSearchValue}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                id="tags-outlined"
                                options={isDeleted}
                                getOptionLabel={(option) => option.label}
                                value={products.stateDeleted}
                                disableClearable
                                onChange={(e, value) =>
                                    handleChangeStateDeleted(value)
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Lọc theo trạng thái"
                                        placeholder="Lọc theo trạng thái"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ButtonProduct
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={() => {
                                    handleClickCreate();
                                }}
                            >
                                Thêm sản phẩm
                            </ButtonProduct>
                        </Grid>
                    </Grid>
                    <ProductTable
                        reRender={reRender}
                        setReRender={setReRender}
                    />
                </SimpleCard>
            ) : (
                <SimpleCard title="Danh sách sản phẩm">
                    <Grid container>
                        <Grid>
                            <StyledButton
                                variant="contained"
                                color="secondary"
                                onClick={handleClickBack}
                            >
                                Quay về
                            </StyledButton>
                        </Grid>
                        <Grid>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                onClick={handleClickCreateProductVariant}
                            >
                                Thêm mới thuộc tính của sản phẩm
                            </StyledButton>
                        </Grid>
                    </Grid>

                    <ProductTable
                        reRender={reRender}
                        setReRender={setReRender}
                    />
                </SimpleCard>
            )}
            {openFormProduct && (
                <DialogCreateProduct
                    open={openFormProduct}
                    handleClose={handleCloseFormProduct}
                />
            )}
            {openDialogProductV && (
                <DialogCreateProductVariant
                    open={openDialogProductV}
                    handleClose={handleCloseDialogCreateProductVariant}
                />
            )}
        </ContainerTable>
    );
};

const mapStateToProps = (state) => ({
    changeStateTable: PropTypes.func.isRequired,
    getProductVariant: PropTypes.func.isRequired,
    products: state.products,
    productVariant: state.productVariant,
});
export default connect(mapStateToProps, {
    changeStateTable,
    getProductVariant,
})(AppProduct);
