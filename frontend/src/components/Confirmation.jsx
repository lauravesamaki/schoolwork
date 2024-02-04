import { Dialog, DialogTitle, DialogActions, DialogContentText } from '@mui/material';
import ButtonComponent from './Button';

export default function Confirmation(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContentText id="alert-dialog-description">
                {props.message}
            </DialogContentText>
            <DialogActions>
                <ButtonComponent onClick={props.handleClose} text="Cancel">
                </ButtonComponent>
                <ButtonComponent onClick={props.handleConfirm} text="Confirm" autoFocus>
                </ButtonComponent>
            </DialogActions>
        </Dialog>
    );
}