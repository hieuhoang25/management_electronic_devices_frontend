import { LoadingButton } from '@mui/lab';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
function DialogConfirm({
    openConfirm = () => {},
    handleClose = () => {},
    handleCloseConfirm = () => {},
    handleConfirmUpdate = () => {},
    loading = false,
}) {
    return (
        <Dialog
            open={openConfirm}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title" color="primary">
                {'XÁC NHẬN'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Xác nhận , điều này sẽ không được hoàn tác sau khi đã chấp
                    nhận
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseConfirm}
                >
                    Huỷ bỏ
                </Button>
                {/* <Button onClick={handleConfirmUpdate} autoFocus>
                    Đồng ý
                </Button> */}
                <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ my: 2 }}
                    onClick={handleConfirmUpdate}
                >
                    Chấp nhận
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirm;
