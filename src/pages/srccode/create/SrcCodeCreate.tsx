import {
  Box,
  Container,
  FormControl,
  FormLabel,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import styles from './srcCodeCreate.module.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { getObjFromLocal } from '../../../types/utils';
import { useNavigate } from 'react-router-dom';
import RichEditor1 from '../../../components/richEditor/RichEditor1';
import Multiselect from 'multiselect-react-dropdown';
import { TypeLanguage, TypePost } from '../../../types';
import { createOrUpdateSrcCode, getAllLanguage, getPosts } from '../../../services';

export default function SrcCodeCreate() {
  const user = getObjFromLocal('user');
  const [errors, setErrors] = useState<string>('');
  const navigate = useNavigate();
  const [languages, setLanguages] = useState<TypeLanguage[]>([]);
  const [posts, setPosts] = useState<TypePost[]>([]);

  const fetchLanguages = async () => {
    try {
      const res = await getAllLanguage();
      setLanguages(res.languages);
    } catch (error) {
      console.error('Error fetching language:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(
        data.post.filter((item: TypePost) => item.created_by == user.user_id)
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    fetchLanguages();
    fetchPosts();
  }, []);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      created_by: user?.user_id,
      name: '',
      content: '',
      language_ids: [],
      post_id: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('You must fill this field'),
      content: Yup.string().required('You must fill this field'),
      language_ids: Yup.array().min(1, 'You must select at least one language')
    }),
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        if (values.content) {
          await createOrUpdateSrcCode(values);
          resetForm();
          setErrors('');
          navigate(-1);
        } else {
          setErrors('You must fill this field');
        }
      } catch (error) {
        console.error('Cannot add new src code', error);
        toast.error('Cannot add new src code');
      }
    }
  });

  return (
    <Container className="container-1">
      <Box className={styles.postForm}>
        <Box className={styles.titleDetails}>
          <Typography variant="h2">Create Source Code</Typography>
        </Box>
        <Box className={styles.content}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              formik.handleSubmit(e);
            }}
          >
            <FormControl className={`${styles.formItem} ${styles.full}`}>
              <FormLabel>
                Name <span className={styles.required}> *</span>:
              </FormLabel>
              <TextField
                margin="dense"
                type="text"
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.name && formik.touched.name)}
                size="small"
                helperText={formik.errors.name}
              />
            </FormControl>

            <FormControl
              className={`${styles.formItem} ${
                posts && posts.length > 0 ? '' : styles.full
              }`}
            >
              <FormLabel>
                Language <span className={styles.required}> *</span>:
              </FormLabel>
              <Multiselect
                className={styles.multiSelect}
                options={languages}
                displayValue="name"
                showCheckbox
                onSelect={(selectedList, selectedItem) => {
                  formik.setFieldValue(
                    'language_ids',
                    selectedList.map((item) => item.id)
                  );
                }}
                onRemove={(selectedList, removedItem) => {
                  const updatedList = selectedList.filter(
                    (item) => item.id !== removedItem.id
                  );
                  formik.setFieldValue(
                    'language_ids',
                    updatedList.map((item) => item.id)
                  );
                }}
              />
              {formik.errors.language_ids && (
                <p className={styles.error}>{formik.errors.language_ids}</p>
              )}
            </FormControl>

            {posts && posts.length > 0 && (
              <FormControl className={styles.formItem}>
                <FormLabel>Post:</FormLabel>
                <TextField
                  select
                  className={styles.formSelect}
                  variant="outlined"
                  size="small"
                  name="post_id"
                  value={formik.values.post_id}
                  onChange={formik.handleChange}
                  sx={{ marginTop: '8px' }}
                >
                  {posts.map((post) => (
                    <MenuItem key={post.post_id} value={post.post_id}>
                      {post.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}

            <RichEditor1
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
