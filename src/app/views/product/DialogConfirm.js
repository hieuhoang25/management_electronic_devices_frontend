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
                    Xác nhận cập nhật các thay đổi thông số của sản phẩm , điều
                    nay sẽ không hoàn tác được sau khi đã xác nhận
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirm}>Huỷ bỏ</Button>
                <Button onClick={handleConfirmUpdate} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirm;
