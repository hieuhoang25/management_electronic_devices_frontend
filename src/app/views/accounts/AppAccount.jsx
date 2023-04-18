import { SimpleCard } from 'app/components';
import { Container } from '../material-kit/tables/AppTable';
import { accountTableHeader } from 'app/utils/constant';
import Loadable from 'app/components/Loadable';
import { Autocomplete, Grid, TextField } from '@mui/material';
import useDebounce from 'app/hooks/useDebounce';
import {
    handleChangeKeysearchAccount,
    handleChangeRole,
    setPageNumberAccount,
} from 'app/redux/actions/AccountAction';
import { useState, useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AccountTable = Loadable(lazy(() => import('./AccountTable')));
const listRole = [
    { label: 'Hiển thị tất cả', id: -1 },
    { label: 'User', id: 1 },
    { label: 'Admin', id: 2 },
];
function AppAccount() {
    const [searchValue, setSearchValue] = useState('');
    const accounts = useSelector((state) => state.accounts);

    const dispatch = useDispatch();

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    };
    const handleChangeStateRole = (value) => {
        dispatch(setPageNumberAccount(1));
        dispatch(handleChangeRole(value));
    };
    const debouncedValue = useDebounce(searchValue, 700);
    useEffect(() => {
        dispatch(setPageNumberAccount(1));
        dispatch(handleChangeKeysearchAccount(debouncedValue));
        // eslint-disable-next-line
    }, [debouncedValue]);

    return (
        <Container>
            <SimpleCard title="Quản lý tài khoản">
                <Grid
                    container
                    flex={1}
                    // direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid xs={8} item>
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
                    <Grid item xs={4}>
                        <Autocomplete
                            id="tags-outlined"
                            options={listRole}
                            getOptionLabel={(option) => option.label}
                            value={accounts.role}
                            disableClearable
                            onChange={(e, value) =>
                                handleChangeStateRole(value)
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
                </Grid>
            </SimpleCard>
            <SimpleCard>
                <AccountTable tableHeader={accountTableHeader} />
            </SimpleCard>
        </Container>
    );
}

export default AppAccount;
