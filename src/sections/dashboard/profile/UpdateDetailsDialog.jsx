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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AuthApi } from '../../../api/Auth/auth.services';

// ----------------------------------------------------------------------

UpdateDetailsDialog.propTypes = {
  state: PropTypes.bool,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function UpdateDetailsDialog({ state, onClose, userData }) {
  const theme = useTheme();

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync, isLoading } = useMutation(
    'update-user-details',
    AuthApi.updateUserDetails,
    {
      onSuccess: () => {
        onClose();
        refetch();
      },
    },
  );

  const UpdateDetailsSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('This field is required.')
      .max(25, 'This field must contain max 25 characters.')
      .matches(/^\s*[^\s]+\s*$/, 'This field is required.'),
    last_name: Yup.string()
      .required('This field is required.')
      .max(25, 'This field must contain max 25 characters.')
      .matches(/^\s*[^\s]+\s*$/, 'This field is required.'),
  });

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateDetailsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isSubmitted },
  } = methods;

  const onSubmit = () => {
    mutateAsync(getValues());
  };

  useEffect(() => {
    if (state) {
      reset();
      setValue('first_name', userData.first_name);
      setValue('last_name', userData.last_name);
      setValue('email', userData.email);
    }
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
        <Typography variant='h6'>Update Personal Details</Typography>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ bgcolor: '#F4F7FA', pt: 1, pb: 2, px: 4 }}>
          <RHFTextField
            name='first_name'
            label='First Name'
            type={'text'}
            isSubmitted={isSubmitted}
          />
          <RHFTextField
            sx={{ mt: 2 }}
            name='last_name'
            label='Last Name'
            type={'text'}
            isSubmitted={isSubmitted}
          />
          <RHFTextField
            disabled
            sx={{ mt: 2 }}
            name='email'
            label='Email'
            type={'email'}
            isSubmitted={isSubmitted}
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
