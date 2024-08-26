import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useMutation } from 'react-query';
import { AuthApi } from '../../../api/Auth/auth.services';
import { Storage } from '../../../storage';
import { PATH_AUTH } from '../../../routes/paths';
import { useEffect, useState } from 'react';
import { Iconify } from '../../../components';
import { useAuthStore } from '../../../zustand/auth.store';

// ----------------------------------------------------------------------

UpdatePasswordDialog.propTypes = {
  state: PropTypes.bool,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function UpdatePasswordDialog({ state, onClose }) {
  const theme = useTheme();
  const { setUserState } = useAuthStore();
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync, isLoading } = useMutation(
    'change-pass-from-profile',
    AuthApi.changePasswordFromProfile,
    {
      onSuccess: () => {
        Storage.clear();
        setUserState('not-auth');
        navigate(PATH_AUTH.login);
      },
      onError: (error) => errorSetter(error.response.data),
    },
  );

  const UpdatePasswordSchema = Yup.object().shape({
    current_password: Yup.string().required('This field is required.'),
    password: Yup.string()
      .required('This field is required.')
      .min(
        8,
        'This password is too short. It must contain at least 8 characters.',
      ),
    password_confirm: Yup.string()
      .required('This field is required.')
      .oneOf([Yup.ref('password'), null], 'Passwords do not match.'),
  });

  const defaultValues = {
    password: '',
    password_confirm: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdatePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    setError,
    formState: { isSubmitted },
  } = methods;

  const errorSetter = (result) => {
    const fields = Object.keys(result);
    fields.map((field) =>
      setError(field, {
        message: result[field].reduce(
          (acc, cur) => acc + (acc ? ', ' : '') + cur,
          '',
        ),
      }),
    );
  };

  const onSubmit = () => {
    mutateAsync(getValues());
  };

  useEffect(() => {
    if (state) reset();
  }, [state]);

  return (
    <Dialog
      open={state}
      onClose={onClose}
      sx={{ maxWidth: '515px', m: 'auto' }}
      fullWidth
    >
      <DialogTitle
        sx={{
          px: 4,
          pt: 2.5,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
        bgcolor={'#F4F7FA'}
      >
        <Typography variant='h6'>Update Password</Typography>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ bgcolor: '#F4F7FA', pt: 1, pb: 2, px: 4 }}>
          <RHFTextField
            name='current_password'
            label='Current Password *'
            type={showOldPassword ? 'text' : 'password'}
            isSubmitted={isSubmitted}
            register={{ ...register('password') }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    <Iconify
                      icon={
                        showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            sx={{ mt: 2 }}
            name='password'
            label='New Password *'
            type={showPassword ? 'text' : 'password'}
            isSubmitted={isSubmitted}
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
          <RHFTextField
            sx={{ mt: 2 }}
            name='password_confirm'
            label='Confirm New Password *'
            type={showConfirmPassword ? 'text' : 'password'}
            isSubmitted={isSubmitted}
            register={{ ...register('password') }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
        </DialogContent>
        <DialogActions sx={{ px: 4, pt: 1, pb: 2, bgcolor: '#F4F7FA' }}>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton
            size='large'
            type='submit'
            variant='contained'
            loading={isLoading}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
