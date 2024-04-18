import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, TextField } from "@mui/material"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import styles from './bookform.module.css';
import { useState } from "react";
import SuccessDialog from "./SuccessDialog";
import { postBookRecommend } from "../../services";
import * as Yup from 'yup';


const BookRecommendDialog = ({ isOpen, handleClose }:
    {
        isOpen: boolean;
        handleClose: () => void
    }) => {
    const [isSuccess, setIsSuccess] = useState(false)

    const handleCloseSuccessLog = () => {
        setIsSuccess(false);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            author: "",
            link: "",
            description: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Please fill in this field'),
            author: Yup.string().required('Please fill in this field'),
            description: Yup.string().required('Please fill in this field'),
        }),
        onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
            try {
                console.log(values)
                await postBookRecommend(values)
                handleClose()
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
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                }}>
                    <DialogTitle className={styles.formTitle}>
                        Book Recommend
                        <button type="button" className={styles.closeBtn} onClick={handleClose}>
                            <CloseIcon />
                        </button>
                    </DialogTitle>
                    <DialogContent className={styles.formContent}>
                        <div className={styles.formContentMain}>
                            <FormControl className={styles.formItem}>
                                <FormLabel>Title <span className={styles.required}> *</span>:</FormLabel>
                                <TextField
                                    className={styles.oneRowInput}
                                    required
                                    margin="dense"
                                    type="text"
                                    variant="outlined"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.title && formik.touched.title)}
                                />
                            </FormControl>
                            <FormControl className={styles.formItem}>
                                <FormLabel>Author <span className={styles.required}> *</span>:</FormLabel>
                                <TextField
                                    className={styles.oneRowInput}
                                    required
                                    margin="dense"
                                    type="text"
                                    variant="outlined"
                                    name="author"
                                    value={formik.values.author}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.author && formik.touched.author)}
                                />
                            </FormControl>
                        </div>
                        <FormControl className={styles.formRemarks}>
                            <FormLabel>Link:</FormLabel>
                            <TextField
                                className={styles.oneRowInput}
                                margin="dense"
                                variant="outlined"
                                name="link"
                                value={formik.values.link}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl className={styles.formRemarks}>
                            <FormLabel>Description <span className={styles.required}> *</span>:</FormLabel>
                            <TextField
                                margin="dense"
                                placeholder="why do you recommend this book?..."
                                multiline
                                rows={3}
                                required
                                variant="outlined"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.description && formik.touched.description)}

                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions className={styles.actionGroup}>
                        <button className={`${styles.btn} ${styles.btnSuccess}`} type="submit">Submit</button>
                        <button className={`${styles.btn} ${styles.grayBtn}`} type="button" onClick={handleClose}>Cancel</button>
                    </DialogActions>
                </form >
            </Dialog >

            <SuccessDialog
                isOpen={isSuccess}
                content="Thank you for your recommendation! We are working on it."
                handleClose={handleCloseSuccessLog}
            />
        </>
    );
}

export default BookRecommendDialog;