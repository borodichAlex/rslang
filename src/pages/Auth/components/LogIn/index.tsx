import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Typography, Button,
} from '@material-ui/core';
import baseUrl from '../../../../helpers/baseUrl';
import styles from '../../styles.module.css';

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Введите E-mail')
    .required('Требуется E-mail'),
  password: Yup
    .string()
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Требуется пароль'),
});

const SignIn: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = res.json();
      console.log({ result });
    },
  });

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={formik.handleSubmit} method="POST">
        <Typography variant="h3" component="h2" color="initial">Вход</Typography>
        <TextField
          fullWidth
          color="secondary"
          variant="outlined"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          color="secondary"
          variant="outlined"
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button className={styles.submit} fullWidth variant="outlined" type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
