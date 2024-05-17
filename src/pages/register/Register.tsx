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

export default function Register() {
  const navigate = useNavigate();

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
      first_name: Yup.string().required('You must fill in this section'),
      last_name: Yup.string().required('You must fill in this section'),
      student_id: Yup.string().required('You must fill in this section'),
      email: Yup.string()
        .email('Invalid Email')
        .required('You must fill in this section'),
      password1: Yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      password2: Yup.string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password1')], 'Your passwords do not match.')
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
            text="First Name  "
            htmlFor="first_name"
            id="first_name"
            type="text"
            required="required"
            name="first_name"
            placeholder="First Name"
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
            text="Last Name"
            htmlFor="last_name"
            id="last_name"
            type="text"
            required="required"
            name="last_name"
            placeholder="Last Name"
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
            text="Student Id"
            htmlFor="student_id"
            id="student_id"
            type="text"
            required="required"
            name="student_id"
            placeholder="Student Id"
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
            text="Password"
            htmlFor="passworks"
            id="passworks"
            type="password"
            required="required"
            name="password1"
            placeholder="Password"
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
            text="Password confirmation"
            htmlFor="passworksconfirmation"
            id="passworksconfirmation"
            type="password"
            required="required"
            name="password2"
            placeholder="Password Confirmation"
            value={formik.values.password2}
            onChange={formik.handleChange}
            errors={
              formik.errors.password2 &&
              formik.touched.password2 &&
              formik.errors.password2
            }
          />
          <Box className={styles.btnLogin}>
            <CustomButton name="Create Account" classNameAdd={styles.register} />
          </Box>
        </form>
      </Box>
    </Container>
  );
}
