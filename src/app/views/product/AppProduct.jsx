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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { connect, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
    changeStateTable,
    handleChangeKeysearch,
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
const SimpleTable = Loadable(lazy(() => import('./SimpleTable')));
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//     { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Whiplash', year: 2014 },
//     { title: 'Gladiator', year: 2000 },
//     { title: 'Memento', year: 2000 },
//     { title: 'The Prestige', year: 2006 },
//     { title: 'The Lion King', year: 1994 },
//     { title: 'Apocalypse Now', year: 1979 },
//     { title: 'Alien', year: 1979 },
//     { title: 'Sunset Boulevard', year: 1950 },
//     {
//         title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//         year: 1964,
//     },
//     { title: 'The Great Dictator', year: 1940 },
//     { title: 'Cinema Paradiso', year: 1988 },
//     { title: 'The Lives of Others', year: 2006 },
//     { title: 'Grave of the Fireflies', year: 1988 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
//     { title: 'Amélie', year: 2001 },
//     { title: 'A Clockwork Orange', year: 1971 },
//     { title: 'Like Stars on Earth', year: 2007 },
//     { title: 'Taxi Driver', year: 1976 },
//     { title: 'Lawrence of Arabia', year: 1962 },
//     { title: 'Double Indemnity', year: 1944 },
//     { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
//     { title: 'Amadeus', year: 1984 },
//     { title: 'To Kill a Mockingbird', year: 1962 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];
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
    const dispatch = useDispatch();

    const handleClickBack = () => {
        changeStateTable('product');
        dispatch(clearStateProductVariant());
    };

    const handleCloseFormProduct = () => {
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
        dispatch(setStateDeleted(value));
    };

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    };
    const debouncedValue = useDebounce(searchValue, 1000);
    useEffect(() => {
        dispatch(handleChangeKeysearch(debouncedValue));
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
                                required
                                id="outlined-required"
                                label="Tìm kiếm"
                                placeholder="Tìm kiếm theo tên sản phẩm"
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

                    {/* <Grid2 container spacing={2}>
                        <Grid2 xs={6} md={6}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Lọc theo loại"
                                        placeholder="Lọc theo loại"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 xs={6} md={6}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                // defaultValue={[top100Films[13]]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Lọc theo thuộc tính"
                                        placeholder="Lọc theo thuộc tính"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid2>
                    </Grid2> */}
                    <SimpleTable />
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
                                Thêm mới product variant
                            </StyledButton>
                        </Grid>
                    </Grid>

                    <SimpleTable />
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
