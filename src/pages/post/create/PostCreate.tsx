import { Box, Container, Typography } from '@mui/material';
import styles from './postCreate.module.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../../components/input/Input';
import RichEditor from '../../../components/richEditor/RichEditor';
import { useEffect, useState } from 'react';
import { postPost } from '../../../services';
import { getObjFromLocal } from '../../../types/utils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RichEditor1 from '../../../components/richEditor/RichEditor1';

export default function PostCreate() {
  const user = getObjFromLocal('user');
  const [errors, setErrors] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrors('');
    navigate(-1);
  };

  useEffect(() => {
    const user = getObjFromLocal('user');
    if (!user) {
      navigate('/login');
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      created_by: user?.user_id,
      title: '',
      content: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t('REQUIRED'))
    }),
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        if (values.content) {
          await postPost(values);
          resetForm();
          setErrors('');
          navigate(-1);
        } else {
          setErrors('You must fill this field');
        }
      } catch (error) {
        console.error('Cannot add new post', error);
        toast.error(t('REQUEST_ERROR'));
      }
    }
  });

  return (
    <Container className="container-1">
      <Box className={styles.postForm}>
        <Box className={styles.titleDetails}>
          <Typography variant="h2">{t('CREATE_POST')}</Typography>
        </Box>
        <Box className={styles.content}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              clasNames="btnLogin"
              text={t('TITLE')}
              htmlFor="title"
              id="title"
              type="text"
              required="required"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              errors={
                formik.errors.title && formik.touched.title && formik.errors.title
              }
            />

            {/* <RichEditor
              clasNames={styles.richEditor}
              text={t('CONTENT')}
              required="required"
              name="content"
              value={formik.values.content}
              onEditorChange={(content: string) =>
                formik.setFieldValue('content', content)
              }
              errors={errors}
            /> */}
            <RichEditor1
              clasNames={styles.richEditor}
              text={t('CONTENT')}
              required="required"
              name="content"
              value={formik.values.content}
              onEditorChange={(content: string) =>
                formik.setFieldValue('content', content)
              }
              errors={errors}
            />

            <div className={styles.btnGroup}>
              <button className={`${styles.btn} ${styles.btnPost}`} type="submit">
                {t('SUBMIT')}
              </button>
              <button
                className={`${styles.btn} ${styles.btnCancel}`}
                onClick={(e) => handleCancel(e)}
              >
                {t('CANCEL')}
              </button>
            </div>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
