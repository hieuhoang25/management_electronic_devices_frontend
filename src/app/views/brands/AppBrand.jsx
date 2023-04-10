import { SimpleCard } from 'app/components';
import PaginationTable from '../material-kit/tables/PaginationTable';
import { useState } from 'react';
import { brandTableHeader } from 'app/utils/constant';
import { Container } from '../material-kit/auto-complete/AppAutoComplete';
import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import DialogBonik from '../material-kit/dialog/DialogBonik';
const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));
export const formBrand = [{ label: 'Tên thương hiệu', type: 'text' }];
function AppBrand() {
    const [pageBrand, setPageBrand] = useState(0);
    const [rowsPerPageBrand, setRowsPerPageBrand] = useState(5);
    const [form, setForm] = useState({});
    const [reRender, setReRender] = useState(true);
    const handleChangePageBrand = (_, newPage) => {
        setPageBrand(newPage);
    };
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setReRender(!reRender);
        setForm('');
        setOpen(false);
    }
    // eslint-disable-next-line

    const handleChangeRowsPerPageBrand = (event) => {
        setRowsPerPageBrand(+event.target.value);
        setPageBrand(0);
    };

    return (
        <Container>
            <SimpleCard title="Quản lý thương hiệu">
                <Grid item>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleClickOpen();
                        }}
                    >
                        Thêm mới
                    </StyledButton>
                </Grid>
                <PaginationTable
                    tableHeader={brandTableHeader}
                    tableName="brand"
                    page={pageBrand}
                    setPage={setPageBrand}
                    rowsPerPage={rowsPerPageBrand}
                    setRowsPerPage={setRowsPerPageBrand}
                    handleChangeRowsPerPage={handleChangeRowsPerPageBrand}
                    handleChangePage={handleChangePageBrand}
                    reRender={reRender}
                    setReRender={setReRender}
                />
            </SimpleCard>
            {open && (
                <DialogBonik
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    dialogName="Thêm mới thương hiệu"
                    typeDialog="create"
                    formBrand={formBrand}
                    form={form}
                    setForm={setForm}
                />
            )}
        </Container>
    );
}

export default AppBrand;
