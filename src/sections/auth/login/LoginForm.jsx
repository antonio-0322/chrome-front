import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// routes
import { PATH_AUTH } from '../../../routes/paths';
import { LoginSchema } from '../../../schemas/schemas';
import { useSignInMutation } from '../../../mutations/login.mutations';

export default function LoginForm({ setLoading }) {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    resolver: yupResolver(LoginSchema),
    initialValues,
  });

  const {
    watch,
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = methods;

  const { mutate, isLoading } = useSignInMutation(setError);

  const fields = watch();

  const allWatchedFields = Object.keys(fields).map(key => fields[key]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if(Object.entries(errors).length) {
      clearErrors();
    }
  }, allWatchedFields);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(mutate)}>
      <Stack spacing={3}>
        <RHFTextField
          name='email'
          label='Email address'
          isSubmitted={isSubmitted}
          register={{ ...register('email') }}
        />

        <RHFTextField
          name='password'
          label='Password'
          isSubmitted={isSubmitted}
          type={showPassword ? 'text' : 'password'}
          register={{ ...register('password') }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {!!errors.general && (
          <Alert
            severity='error'
            sx={{color: '#D32F2F', ".MuiAlert-icon" : {display: "flex", alignItems: "center"}}}
          >
            {errors.general.message}
          </Alert>
        )}

        <Link
          align='center'
          variant='body1'
          mt={2.5}
          sx={{ textDecoration: 'none' }}
          to={PATH_AUTH.forgotPassword}
          component={RouterLink}
        >
          Forgot Password
        </Link>

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading}
        >
          Sign In
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
