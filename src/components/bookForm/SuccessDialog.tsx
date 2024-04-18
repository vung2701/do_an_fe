import { Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import styles from './bookform.module.css';

const SuccessDialog = ({ isOpen, content, handleClose }:
    {
        isOpen: boolean;
        content: string;
        handleClose: () => void
    }) => {

    return (
        < Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle className={styles.formTitle}>
                Submitted successfully!
                <button className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon />
                </button>
            </DialogTitle>
            <DialogContentText className={styles.successText}>
                {content}
            </DialogContentText>
            <DialogActions className={styles.actionGroup}>
                <button className={`${styles.btn} ${styles.grayBtn}`} onClick={handleClose}>Close</button>
            </DialogActions>
        </ Dialog>
    );
}

export default SuccessDialog;