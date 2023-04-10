import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogConfirm from 'app/views/product/Dialog/DialogConfirm';
import React from 'react';
import { useState } from 'react';
import SnackbarCusom from './SnackbarCustom';
import axios from 'axios.js';

export default function DialogBonik({ ...props }) {
    const {
        open,
        handleClose,
        dialogName,
        typeDialog,
        formBrand,
        form,
        setForm,
    } = props;

    const [resSnackbar, setResSnackbar] = useState();
    const handleChangeFormBrand = (e) => {
        setForm((pre) => {
            return { ...pre, brand_name: e.target.value };
        });
    };

    const [openConfirm, setOpenConfirm] = useState(false);
    //     const [openSnackBar, setOpenSnackBar] = useState(false);
    const [load, setLoad] = useState(false);
    const handleClickOpenConfirm = () => {
        //         setLoad(true);

        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleConfirmUpdate = async () => {
        setLoad(true);
        if (dialogName === 'Thêm mới thương hiệu') {
            let res = await axios
                .post(process.env.REACT_APP_BASE_URL + 'brand', form)
                .catch((error) => (res = error.response));
            setResSnackbar(res);
        } else if (dialogName === 'Cập nhật thương hiệu') {
            const newBrand = { id: form.brand_id, brand_name: form.brand_name };
            let res;
            res = await axios
                .put(process.env.REACT_APP_BASE_URL + 'brand', newBrand)
                .catch((error) => (res = error.response));
            setResSnackbar(res);
        }
        setLoad(false);
        setOpenConfirm(false);
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">{dialogName}</DialogTitle>
                <DialogContentText></DialogContentText>
                {formBrand.length > 0 &&
                    formBrand.map((value, index) => (
                        <DialogContent key={index}>
                            <TextField
                                key={index}
                                margin="dense"
                                id="name"
                                label={value.label}
                                type={value.type}
                                fullWidth
                                value={(form && form.brand_name) || ''}
                                onChange={(e) => {
                                    handleChangeFormBrand(e);
                                }}
                            />
                        </DialogContent>
                    ))}
                <DialogActions
                    sx={{
                        marginBottom: '10px',
                        marginRight: '5px',
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClickOpenConfirm}
                        color="primary"
                    >
                        {typeDialog === 'create' ? 'Thêm mới' : 'Cập nhật'}
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
            {resSnackbar && <SnackbarCusom response={resSnackbar} />}
        </Box>
    );
}
