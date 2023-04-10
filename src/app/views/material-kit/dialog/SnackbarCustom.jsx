import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

function SnackbarCusom({ ...props }) {
    const { response, type } = props;
    const [stateSnackbar, setStateSnackbar] = useState({
        message: '',
        status: 'success',
        open: false,
    });
    const [message, setMessage] = useState('');

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStateSnackbar((pre) => {
            return { ...pre, open: false };
        });
    };
    useEffect(() => {
        switch (type) {
            case 'update':
                setMessage('Cập nhật ');
                break;
            case 'create':
                setMessage('Thêm ');
                break;
            case 'delete':
                setMessage('Xoá ');
                break;
            default:
                break;
        }
    }, [response, type]);

    useEffect(() => {
        if (response.status !== 200) {
            setStateSnackbar({
                message: message + 'thất bại: ' + response.data.error || '',
                status: 'error',
                open: true,
            });
        } else {
            setStateSnackbar({
                message: message + 'thành công',
                status: 'success',
                open: true,
            });
        }
        // eslint-disable-next-line
    }, [response, message]);

    return (
        <Snackbar
            open={stateSnackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={handleCloseSnackBar}
                severity={stateSnackbar.status}
                md={{ width: '100%' }}
            >
                {stateSnackbar.message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarCusom;
