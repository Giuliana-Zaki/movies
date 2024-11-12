import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormGroup, Button, TextField } from '@mui/material';
import YupPassword from 'yup-password';
YupPassword(yup);

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character')
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: 'test@example.com',
      password: 'Password@123'
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      navigate(`/`);
    }
  });
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ marginTop: 100 }}>
        <FormGroup>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 3 }}
          />
          <Button color='inherit' variant='contained' fullWidth type='submit'>
            Submit
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}
