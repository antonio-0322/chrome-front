import * as Yup from 'yup';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

import { useAuthStore } from '../../../zustand/auth.store';
import { Storage } from '../../../storage';
import { EmailFormSchema } from '../../../schemas/schemas';

export default function EmailForm() {
  const { setEmail } = useAuthStore();
  
  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(EmailFormSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

  const onSubmit = async () => {
    Storage.setItem('email', watch('email'));
    window.location.replace('/auth/register');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name='email'
          label='Email address'
          register={{ ...register('email') }}
          isSubmitted={isSubmitted}
        />

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Continue
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
