import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './profile.module.css';
import { toast } from 'react-toastify';
import { deletePost, deleteSrcCode } from '../../services';

const DeleteDialog = ({
  id,
  type,
  isOpen,
  handleClose,
  fetchData
}: {
  id?: string;
  type?: string;
  isOpen: boolean;
  handleClose: () => void;
  fetchData?: any;
}) => {
  const handleDelete = async () => {
    try {
      if (type == 'post') {
        await deletePost(id);
      } else if (type == 'code') {
        await deleteSrcCode(id);
      }
      handleClose();
      await fetchData();
      toast.success('delete success');
    } catch (error) {
      console.error('error delete item:', error);
      toast.error('delete error');
    }
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle className={styles.formTitle}>
        Delete
        <button className={styles.closeBtn} onClick={handleClose}>
          <CloseIcon />
        </button>
      </DialogTitle>
      <DialogContentText className={styles.successText}>
        Are you sure delete this item?
      </DialogContentText>
      <DialogActions className={styles.actionGroup}>
        <button
          className={`${styles.btn} ${styles.btnDelete}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
        <button
          className={`${styles.btn} ${styles.grayBtn}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
