import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Typography,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from '../../../components/hook-form';
// routes
import { PATH_AUTH, PATH_PAGE } from '../../../routes/paths';

import { RegisterSchema } from '../../../schemas/schemas.js';
import { useRegisterMutation } from '../../../mutations/register.mutation';

import { Storage } from '../../../storage';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const helperText = (
  <Box>
    <Typography variant='caption' component={'p'}>
      The password must be at least 8 characters long.
    </Typography>
    <Typography variant='caption' component={'p'}>
      The password must contain at least one uppercase letter, number, and
      special character.
    </Typography>
  </Box>
);

// ----------------------------------------------------------------------

export default function RegisterForm({ setLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const prefieldEmail = Storage.getItem('email');

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: prefieldEmail || '',
    password: '',
    password_confirm: '',
    terms: false,
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = methods;

  const { mutate, isLoading } = useRegisterMutation(setError);

  useEffect(() => {
    return () => {
      Storage.removeItem('email');
    };
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(mutate)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name='first_name'
          label='First name'
          isSubmitted={isSubmitted}
          register={{ ...register('first_name') }}
        />

        <RHFTextField
          name='last_name'
          label='Last name'
          isSubmitted={isSubmitted}
          register={{ ...register('last_name') }}
        />

        <RHFTextField
          name='email'
          label='Email address'
          autoComplete='new-email'
          isSubmitted={isSubmitted}
          register={{ ...register('email') }}
        />

        <RHFTextField
          name='password'
          label='Password'
          autoComplete='new-password'
          isSubmitted={isSubmitted}
          helperText={(isSubmitted && errors?.password?.message) || helperText}
          register={{ ...register('password') }}
          type={showPassword ? 'text' : 'password'}
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

        <RHFTextField
          name='password_confirm'
          label='Confirm Password'
          isSubmitted={isSubmitted}
          register={{ ...register('password_confirm') }}
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFCheckbox
          name='terms'
          error={errors.terms}
          register={{ ...register('terms') }}
          isSubmitted={isSubmitted}
          label={
            <Typography variant='body2'>
              I accept the{' '}
              <Link
                target={'_blank'}
                underline='always'
                variant='subtitle2'
                component={RouterLink}
                to={PATH_PAGE.terms}
              >
                Terms & Conditions
              </Link>
            </Typography>
          }
        />

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading}
        >
          Sign Up
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
