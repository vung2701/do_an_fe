import { Box, Container } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { registerUser } from '../../services';
import CustomButton from '../../components/customButton/CustomButton';
import Titles from '../../components/titles/Titles';
import Input from '../../components/input/Input';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isLogin } from '../../middlewares/Authorization';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogin()) {
      navigate('/');
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      student_id: '',
      password1: '',
      password2: ''
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(t('NOT_EMPTY')),
      last_name: Yup.string().required(t('NOT_EMPTY')),
      student_id: Yup.string().required(t('NOT_EMPTY')),
      email: Yup.string().email(t('INVALID_EMAIL')).required(t('NOT_EMPTY')),
      password1: Yup.string()
        .required(t('NO_PASS'))
        .min(6, t('PASS_TOO_SHORT'))
        .matches(/[a-zA-Z]/, t('PASS_LETTER')),
      password2: Yup.string()
        .required(t('RETYPE_PASS'))
        .oneOf([Yup.ref('password1')], t('PASS_NOT_MATCH'))
    }),
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        const res = await registerUser(values);
        if (res.data.error == 0) {
          toast.success('Account successfully created!');
          resetForm();
          navigate('/login', { state: { key: res?.data?.inform_msg } });
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('The account already exists or the email is incorrect!');
      }
    }
  });

  return (
    <Container className={styles.container}>
      <Box className={styles.form}>
        <Titles classNameAdd={styles.titleLogin} name="Join Today" />
        <form onSubmit={formik.handleSubmit}>
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text={t('FIRST_NAME')}
            htmlFor="first_name"
            id="first_name"
            type="text"
            required="required"
            name="first_name"
            placeholder={t('FIRST_NAME')}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            errors={
              formik.errors.first_name &&
              formik.touched.first_name &&
              formik.errors.first_name
            }
          />
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text={t('LAST_NAME')}
            htmlFor="last_name"
            id="last_name"
            type="text"
            required="required"
            name="last_name"
            placeholder={t('LAST_NAME')}
            value={formik.values.last_name}
            onChange={formik.handleChange}
            errors={
              formik.errors.last_name &&
              formik.touched.last_name &&
              formik.errors.last_name
            }
          />
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text="Email"
            htmlFor="email"
            id="email"
            type="email"
            required="required"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errors={
              formik.errors.email && formik.touched.email && formik.errors.email
            }
          />
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text={t('STUDENT_ID')}
            htmlFor="student_id"
            id="student_id"
            type="text"
            required="required"
            name="student_id"
            placeholder={t('STUDENT_ID')}
            value={formik.values.student_id}
            onChange={formik.handleChange}
            errors={
              formik.errors.student_id &&
              formik.touched.student_id &&
              formik.errors.student_id
            }
          />
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text={t('PASSWORD')}
            htmlFor="passworks"
            id="passworks"
            type="password"
            required="required"
            name="password1"
            placeholder={t('PASSWORD')}
            value={formik.values.password1}
            onChange={formik.handleChange}
            errors={
              formik.errors.password1 &&
              formik.touched.password1 &&
              formik.errors.password1
            }
          />
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text={t('PASSWORD_CONFIRMATION')}
            htmlFor="passworksconfirmation"
            id="passworksconfirmation"
            type="password"
            required="required"
            name="password2"
            placeholder={t('PASSWORD_CONFIRMATION')}
            value={formik.values.password2}
            onChange={formik.handleChange}
            errors={
              formik.errors.password2 &&
              formik.touched.password2 &&
              formik.errors.password2
            }
          />
          <Box className={styles.btnLogin}>
            <CustomButton
              name={t('CREATE_ACCOUNT')}
              classNameAdd={styles.register}
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
}
