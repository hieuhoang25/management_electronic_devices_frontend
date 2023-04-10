import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

function SnackbarCusom({ ...props }) {
    const { response } = props;
    const [stateSnackbar, setStateSnackbar] = useState({
        message: '',
        status: 'success',
        open: false,
    });
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStateSnackbar((pre) => {
            return { ...pre, open: false };
        });
    };
    useEffect(() => {
        if (response.status !== 200) {
            setStateSnackbar({
                message: 'Cập nhật thất bại: ' + response.data.error || '',
                status: 'error',
                open: true,
            });
        } else {
            setStateSnackbar({
                message: 'Cập nhật thành công: ',
                status: 'success',
                open: true,
            });
        }
    }, [response]);

    return (
        <Snackbar
            open={stateSnackbar.open}
            autoHideDuration={1500}
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
    //     <Snackbar
    //         open={openSnackBar}
    //         autoHideDuration={1500}
    //         onClose={handleCloseSnackBar}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     >
    //         <Alert
    //             onClose={handleCloseSnackBar}
    //             severity={status}
    //             md={{ width: '100%' }}
    //         >
    //             {message}
    //         </Alert>
    //     </Snackbar>
    // );
}

export default SnackbarCusom;
