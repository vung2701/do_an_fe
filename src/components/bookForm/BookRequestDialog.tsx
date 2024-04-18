import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import styles from './bookform.module.css';
import { getObjFromLocal } from '../../types/untils';
import { useEffect, useState } from 'react';
import { getMemberId, postBookRequest } from '../../services';
import { TypeMemberId } from '../../types';
import { isLogin } from '../../middlewares/Authorization';
import SuccessDialog from './SuccessDialog';

const BookRequestDialog = ({
  isOpen,
  book,
  title,
  book_type,
  isBorrow,
  handleClose
}: {
  isOpen: boolean;
  book?: string;
  title?: string;
  book_type: number;
  isBorrow?: boolean;
  handleClose: () => void;
}) => {
  const [user, setUser] = useState<TypeMemberId>();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCloseSuccessLog = () => {
    setIsSuccess(false);
  };

  const fetchUser = async () => {
    if (isLogin()) {
      const response = await getMemberId(getObjFromLocal('user')?.user_id);
      setUser(response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      book: book,
      book_type: book_type,
      request_type: 1,
      request_description: ''
    },
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        await postBookRequest(values);
        handleClose();
        resetForm();
        setIsSuccess(true);
      } catch (error) {
        console.error('Cannot add book request', error);
        toast.error('Cannot add book request');
      }
    }
  });

  return (
    <>
      {/* Form */}
      <Dialog open={isOpen} onClose={handleClose} fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className={styles.formTitle}>
            Book Request: New
            <button type="button" className={styles.closeBtn} onClick={handleClose}>
              <CloseIcon />
            </button>
          </DialogTitle>
          <DialogContent className={styles.formContent}>
            <div className={styles.formContentMain}>
              <FormControl className={styles.formItem}>
                <FormLabel>
                  Book Type<span className={styles.required}> *</span>:
                </FormLabel>
                <RadioGroup
                  row
                  className={styles.radioGroup}
                  name="request_type"
                  value={formik.values.request_type}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="Hard Copy"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio size="small" />}
                    label="Soft Copy"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={styles.formItem}>
                <FormLabel>Book:</FormLabel>
                <TextField
                  className={styles.disableField}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  name="book"
                  value={title}
                />
              </FormControl>
              <FormControl className={styles.formItem}>
                <FormLabel>
                  Request Type<span className={styles.required}> *</span>:
                </FormLabel>
                <RadioGroup
                  row
                  className={styles.radioGroup}
                  name="book_type"
                  value={formik.values.book_type}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value={1}
                    disabled={!isBorrow}
                    control={<Radio size="small" />}
                    label="Borrow"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio size="small" />}
                    label="Lend"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={styles.formItem}>
                <FormLabel>Requester:</FormLabel>
                <TextField
                  className={styles.disableField}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  value={`${user?.first_name} ${user?.last_name}`}
                />
              </FormControl>
            </div>
            <FormControl className={styles.formRemarks}>
              <FormLabel>Remarks:</FormLabel>
              <TextField
                margin="dense"
                multiline
                rows={3}
                variant="outlined"
                name="request_description"
                value={formik.values.request_description}
                onChange={formik.handleChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions className={styles.actionGroup}>
            <button className={`${styles.btn} ${styles.btnSuccess}`} type="submit">
              Submit
            </button>
            <button
              className={`${styles.btn} ${styles.grayBtn}`}
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </DialogActions>
        </form>
      </Dialog>

      <SuccessDialog
        isOpen={isSuccess}
        content="Thank you for your request! We will contact you via email shortly."
        handleClose={handleCloseSuccessLog}
      />
    </>
  );
};

export default BookRequestDialog;
