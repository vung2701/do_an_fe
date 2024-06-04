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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        {t('DELETE')}
        <button className={styles.closeBtn} onClick={handleClose}>
          <CloseIcon />
        </button>
      </DialogTitle>
      <DialogContentText className={styles.successText}>
        {t('DELETE_TEXT')}
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
          {t('DELETE')}
        </button>
        <button
          className={`${styles.btn} ${styles.grayBtn}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
        >
          {t('CANCEL')}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
