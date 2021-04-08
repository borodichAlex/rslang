import React, { useRef, FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Typography, Button, Fab,
} from '@material-ui/core';
import { Add as AddIcon, Check as CheckIcon } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import DefaultAvatar from './default-avatar.jpeg';

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
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), ''], 'Пароли должны совпадать')
    .required('Требуется подтвердить пароль'),
});

const SignUp: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const [loadingImage, setLoadingImage] = React.useState(false);
  const [successLoading, setSuccessLoading] = React.useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  function readImage(input: HTMLInputElement) {
    if (input.files) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        console.error('ERROR: file is not image');
      }

      const img = imageRef.current;
      if (img) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onprogress = () => {
          setSuccessLoading(false);
          setLoadingImage(true);
        };

        reader.onload = function () {
          setTimeout(() => {
            if (typeof reader.result === 'string') {
              img.src = reader.result;
              setSuccessLoading(true);
              setLoadingImage(false);
            }
          }, 1000);
        };

        reader.onerror = function () {
          console.error(reader.error);
        };
      }
    }
  }

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={formik.handleSubmit} method="POST">
        <Typography variant="h3" component="h2" color="initial">Регистрация</Typography>
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
        <TextField
          fullWidth
          color="secondary"
          variant="outlined"
          id="confirmPassword"
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        <div className={styles.upload}>
          <img src={DefaultAvatar} className={styles.preview} alt="avatar" ref={imageRef} />
          {loadingImage && <CircularProgress size={50} className={styles.progress} color="secondary" /> }
          <label htmlFor="upload-photo">
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/png, image/jpeg, image/png, image/Webp"
              onChange={(e) => readImage(e.currentTarget)}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              {successLoading ? <CheckIcon /> : <AddIcon />}
              Добавить фото
            </Fab>
          </label>
        </div>

        <Button className={styles.submit} fullWidth variant="outlined" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
