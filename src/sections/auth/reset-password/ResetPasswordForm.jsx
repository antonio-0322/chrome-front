import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Card,
  Typography,
  Avatar,
  useTheme,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { ResetPasswordSchema } from '../../../schemas/schemas';
import { useResetPassMutation } from '../../../mutations/resetPassword.mutation';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CachedIcon from '@mui/icons-material/Cached';
import { AuthApi } from '../../../api/Auth/auth.services';

export default function ResetPasswordForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let params = new URLSearchParams(window.location.search);
  let code = params.get('code');
  let email = location.search.split('&')[0].split('=')[1];

  const defaultValues = {
    password: '',
    password_confirm: '',
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = methods;

  const { mutate, isLoading } = useResetPassMutation(setError, code, email);

  const resendEmail = async () => {
    try {
      const response = await AuthApi.forgetPassword({
        email: encodeURIComponent(email),
        email_type: 'reset_password',
      });
      if (response.status === 204) {
        navigate('/auth/sended', {
          state: {
            email: email,
            email_type: 'reset_password',
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!errors?.verify && !errors?.general ? (
        <Card sx={{ p: 2.5 }} elevation={3}>
          <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='h5' gutterBottom>
                Create New Password
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Enter new password for your account
              </Typography>
            </Box>
          </Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(mutate)}>
            <Stack spacing={3}>
              {!!errors.afterSubmit && (
                <Alert severity='error'>{errors.afterSubmit.message}</Alert>
              )}

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
                          icon={
                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                          }
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
                type={showConfirmPassword ? 'text' : 'password'}
                register={{ ...register('password_confirm') }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton
                        edge='end'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Iconify
                          icon={
                            showConfirmPassword
                              ? 'eva:eye-fill'
                              : 'eva:eye-off-fill'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                Submit
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Card>
      ) : (
        <Card sx={{ p: 2.5 }} elevation={3}>
          <Box
            pr={2}
            sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}
            justifyContent={'space-between'}
          >
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 350,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Verification Error
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {errors?.verify?.message || errors?.general?.message}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 54,
                height: 54,
                bgcolor: theme.palette.error[100],
              }}
            >
              <PriorityHighIcon
                sx={{
                  color: theme.palette.error.main,
                }}
              />
            </Avatar>
          </Box>
          <Button size='medium' color='primary' onClick={() => resendEmail()}>
            <CachedIcon sx={{ mr: 1 }} />
            Resend Link
          </Button>
        </Card>
      )}
    </>
  );
}
