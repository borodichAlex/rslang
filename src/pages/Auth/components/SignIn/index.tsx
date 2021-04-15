import React, { FC, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Typography, Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import signInReducer, { initialState } from './reducer';
import { userLoggedIn } from '../../../../redux/user/actions';
import baseUrl from '../../../../helpers/baseUrl';
import {
 signInFail, signInRequest, signInSuccess,
} from './actions';
import { setAccessToken, setRefreshToken } from '../../../../utils/TokenUtils';

import styles from '../../styles.module.css';
import { setUserId } from '../../../../utils/UserUtils';

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

type IResSignIn = {
  avatar: string,
  message: string,
  name: string,
  refreshToken: string,
  token: string,
  userId: string,
}

const SignIn: FC = () => {
  const [state, dispatch] = useReducer(signInReducer, initialState);
  const history = useHistory();

  const dispatchUser = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(signInRequest());

      const res = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const {
          name, avatar, userId, refreshToken, token,
        }: IResSignIn = await res.json();

        dispatch(signInSuccess());

        setRefreshToken(refreshToken);
        setAccessToken(token);
        setUserId(userId);

        dispatchUser(userLoggedIn({ name, avatar }));
        history.goBack();
      } else {
        dispatch(signInFail(res.status));
      }
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

        {state.isLoading ? <h3>Проверка</h3> : (state.isError && 'Not Found')}
        <Button className={styles.submit} fullWidth variant="outlined" type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
