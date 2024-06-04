import { Box, Container } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services';
import CustomButton from '../../components/customButton/CustomButton';
import CustomLinks from '../../components/customLinks/CustomLinks';
import Titles from '../../components/titles/Titles';
import Input from '../../components/input/Input';
import styles from './login.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLogin } from '../../middlewares/Authorization';
import Login1 from '../../components/Oauth/Login1';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const informMsg = location.state?.key;
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogin()) {
      navigate('/');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED')),
      password: Yup.string()
        .required(t('NO_PASS'))
        .min(6, t('PASS_TOO_SHORT'))
        .matches(/[a-zA-Z]/, t('PASS_LETTER'))
    }),
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      try {
        const schema = {
          username: values.username,
          password: values.password
        };
        const res = await loginUser(schema);
        login(res.data.token, location.state);
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Form submission failed. Please try again.');
      }
    }
  });

  return (
    <Container className={styles.container}>
      <Box className={styles.form}>
        <Titles classNameAdd={styles.titleLogin} name="Login" />
        {informMsg && <p className={styles.mess}>{informMsg}</p>}
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              formik.handleSubmit(e);
            }
          }}
        >
          <Input
            autoComplete="new-password"
            clasNames="btnLogin"
            text="Email"
            htmlFor="email"
            id="email"
            type="email"
            required="required"
            name="username"
            placeholder="Email"
            value={formik.values.username}
            onChange={formik.handleChange}
            errors={
              formik.errors.username &&
              formik.touched.username &&
              formik.errors.username
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
            name="password"
            placeholder={t('PASSWORD')}
            value={formik.values.password}
            onChange={formik.handleChange}
            errors={
              formik.errors.password &&
              formik.touched.password &&
              formik.errors.password
            }
          />
          <Box className={styles.btnLogin}>
            <CustomButton name={t('LOGIN')} classNameAdd={styles.login} />
            <p className={styles.or}>{t('OR')}</p>
          </Box>
        </form>

        <Box className={styles.addLogin}>
          <CustomLinks
            name={t('REGISTER')}
            classNameAdd={styles.register}
            links="/register"
          />
        </Box>
        {/* <Login1 />
        {protectedData && <p>{protectedData}</p>} */}
      </Box>
    </Container>
  );
}
