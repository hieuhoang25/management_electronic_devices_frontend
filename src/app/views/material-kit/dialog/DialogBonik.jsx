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
import { useEffect } from 'react';

export default function DialogBonik({ ...props }) {
    const {
        open,
        handleClose,
        dialogName,
        typeDialog,
        formBrand = [],
        formCategory = [],
        form,
        setForm,
        data,
    } = props;

    const [snackBar, setSnackbar] = useState({ response: null, type: '' });
    const handleChangeForm = (e, name) => {
        if (name === 'brand') {
            setForm((pre) => {
                return { ...pre, brand_name: e.target.value };
            });
        } else if (name === 'category') {
            setForm((pre) => {
                return { ...pre, category_name: e.target.value };
            });
        }
    };
    const [openConfirm, setOpenConfirm] = useState(false);
    const [load, setLoad] = useState(false);
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    useEffect(() => {
        if (dialogName === 'Thêm mới danh mục con') {
            setForm('');
        }
        // eslint-disable-next-line
    }, []);
    const handleConfirmUpdate = async () => {
        setLoad(true);
        if (dialogName === 'Thêm mới thương hiệu') {
            let res = await axios
                .post(process.env.REACT_APP_BASE_URL + 'brand', form)
                .catch((error) => (res = error.response));
            setSnackbar((pre) => {
                return { ...pre, type: 'create', response: res };
            });
        } else if (dialogName === 'Cập nhật thương hiệu') {
            const newBrand = { id: data.id, brand_name: form.brand_name };

            let res;
            res = await axios
                .put(process.env.REACT_APP_BASE_URL + 'brand', newBrand)
                .catch((error) => (res = error.response));
            setSnackbar((pre) => {
                return { ...pre, type: 'update', response: res };
            });
        } else if (dialogName === 'Thêm mới danh mục cha') {
            let res = await axios
                .post(process.env.REACT_APP_BASE_URL + 'category', form)
                .catch((error) => (res = error.response));
            setSnackbar((pre) => {
                return { ...pre, type: 'create', response: res };
            });
        } else if (dialogName === 'Thêm mới danh mục con') {
            const newCategory = {
                parent_id: data.id,
                category_name: form.category_name,
            };
            let res = await axios
                .post(process.env.REACT_APP_BASE_URL + 'category', newCategory)
                .catch((error) => (res = error.response));
            setSnackbar((pre) => {
                return { ...pre, type: 'create', response: res };
            });
        } else if (dialogName === 'Cập nhật danh mục con') {
            const newCategory = {
                id: data.id,
                category_name: form.category_name,
                parent_id: data.parent_id,
            };

            let res = await axios
                .put(process.env.REACT_APP_BASE_URL + 'category', newCategory)
                .catch((error) => (res = error.response));
            setSnackbar((pre) => {
                return { ...pre, type: 'update', response: res };
            });
        } else if (dialogName === 'Cập nhật danh mục cha') {
            const newCategory = {
                id: data.id,
                category_name: form.category_name,
            };

            let res = await axios
                .put(process.env.REACT_APP_BASE_URL + 'category', newCategory)
                .catch((error) => (res = error.response));
            setSnackbar((pre) => {
                return { ...pre, type: 'update', response: res };
            });
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
                                    handleChangeForm(e, 'brand');
                                }}
                            />
                        </DialogContent>
                    ))}
                {formCategory.length > 0 &&
                    formCategory.map((value, index) => (
                        <DialogContent key={index}>
                            <TextField
                                key={index}
                                margin="dense"
                                id="name"
                                label={value.label}
                                type={value.type}
                                fullWidth
                                value={(form && form.category_name) || ''}
                                onChange={(e) => {
                                    handleChangeForm(e, 'category');
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
            {openConfirm && (
                <DialogConfirm
                    openConfirm={openConfirm}
                    handleClose={handleClose}
                    handleCloseConfirm={handleCloseConfirm}
                    handleConfirmUpdate={handleConfirmUpdate}
                    loading={load}
                />
            )}

            {snackBar.response && (
                <SnackbarCusom
                    response={snackBar.response}
                    type={snackBar.type}
                />
            )}
        </Box>
    );
}
