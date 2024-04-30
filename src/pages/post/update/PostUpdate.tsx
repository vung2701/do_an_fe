import { Box, Container, Typography } from '@mui/material';
import styles from './postUpdate.module.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../../components/input/Input';
import RichEditor from '../../../components/richEditor/RichEditor';
import { useEffect, useState } from 'react';
import { getPost, updatePost } from '../../../services';
import { getObjFromLocal } from '../../../types/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { TypePost } from '../../../types';

export default function PostUpdate() {
  let { id } = useParams();
  const [post, setPost] = useState<TypePost>();
  const [errors, setErrors] = useState<string>('');
  const navigate = useNavigate();

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

    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching or filtering post:', error);
      }
    };
    fetchPost();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      post_id: post?.post_id || '',
      title: post?.title || '',
      content: post?.content || ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('You must fill this field.')
    }),
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        if (values.content) {
          await updatePost(values);
          resetForm();
          setErrors('');
          navigate(-1);
        } else {
          setErrors('You must fill this field.');
        }
      } catch (error) {
        console.error('Cannot update post', error);
        toast.error('Cannot update post');
      }
    }
  });

  return (
    <Container className="container-1">
      <Box className={styles.postForm}>
        <Box className={styles.titleDetails}>
          <Typography variant="h2">Update Post</Typography>
        </Box>
        <Box className={styles.content}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              clasNames="btnLogin"
              text="Title"
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

            <RichEditor
              clasNames={styles.richEditor}
              text="Content"
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
                Submit
              </button>
              <button
                className={`${styles.btn} ${styles.btnCancel}`}
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
