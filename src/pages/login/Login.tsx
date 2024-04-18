import { Box, Container } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import {
  LoginFacebook,
  LoginGoogle,
  LoginLinkedIn,
  loginUser
} from '../../services';
import CustomButton from '../../components/customButton/CustomButton';
import CustomLinks from '../../components/customLinks/CustomLinks';
import Titles from '../../components/titles/Titles';
import Input from '../../components/input/Input';
import styles from './login.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LoginSocialFacebook,
  LoginSocialGoogle,
  LoginSocialLinkedin
} from 'reactjs-social-login';
import { useEffect } from 'react';
import { isLogin } from '../../middlewares/Authorization';

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const informMsg = location.state?.key;
  const navigate = useNavigate();

  // const handleLoginFacebook = async ({ data }: any) => {
  //   try {
  //     const response = await LoginFacebook(data.accessToken);
  //     login(response?.data?.token, location.state);
  //   } catch (error) {
  //     console.log('Login facebook false');
  //   }
  // };

  // const handleLoginGoogle = async ({ data }: any) => {
  //   try {
  //     const response = await LoginGoogle(data.access_token);
  //     login(response?.data?.token, location.state);
  //   } catch (error) {
  //     console.log('Login google false');
  //   }
  // };

  // const handleLoginLinkedIn = async ({ data }: any) => {
  //   try {
  //     const response = await LoginLinkedIn(data.access_token);
  //     login(response?.data?.token, location.state);
  //   } catch (error) {
  //     console.log('Login linked false');
  //   }
  // };

  // const handleReject = ({ err }: any) => {
  //   console.log('Login reject:', err);
  // };

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
      username: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
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
            text="Password"
            htmlFor="passworks"
            id="passworks"
            type="password"
            required="required"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errors={
              formik.errors.password &&
              formik.touched.password &&
              formik.errors.password
            }
          />
          <Box className={styles.btnLogin}>
            <CustomButton name="Login" classNameAdd={styles.login} />
            <p className={styles.or}>Or</p>
          </Box>
        </form>

        {/* <Box className={styles.socialLogin}>
          <span>Login with:</span>
          <Box className={styles.socialBtnBox}>
            <LoginSocialFacebook
              className={styles.socialLoginBtn}
              appId={import.meta.env.VITE_FB_APP_ID}
              isOnlyGetToken
              onResolve={handleLoginFacebook}
              scope={[
                'public_profile',
                'email',
              ]}
              onReject={handleReject}
            >
              <img loading='lazy' src="/public/images/facebook.png" alt="facebook" />
            </LoginSocialFacebook>

            <LoginSocialGoogle
              className={styles.socialLoginBtn}
              client_id={import.meta.env.VITE_GG_APP_ID}
              isOnlyGetToken
              scope="openid profile email"
              discoveryDocs="claims_supported"
              onResolve={handleLoginGoogle}
              onReject={handleReject}
            >
              <img loading='lazy' src="/public/images/google.png" alt="google" />
            </LoginSocialGoogle>

            <LoginSocialLinkedin
              className={styles.socialLoginBtn}
              client_id={import.meta.env.VITE_LINKEDIN_APP_ID}
              client_secret={import.meta.env.VITE_LINKEDIN_APP_SECRET}
              redirect_uri={
                (window.location.hostname === 'baw.avtvn.com') ? "https://baw.avtvn.com/login" :
                  ((window.location.hostname === 'test-baw.avtvn.com') ? "https://test-baw.avtvn.com/login" :
                    "http://localhost:5173/login")}
              isOnlyGetToken
              scope={["profile", "openid", "email"]}
              onResolve={handleLoginLinkedIn}
              onReject={handleReject}
            >
              <img loading='lazy' src="/public/images/linkedin.png" alt="linkedin" />
            </LoginSocialLinkedin>

          </Box>
        </Box> */}

        <Box className={styles.addLogin}>
          <CustomLinks
            name="Register"
            classNameAdd={styles.register}
            links="/register"
          />
        </Box>
      </Box>
    </Container>
  );
}
