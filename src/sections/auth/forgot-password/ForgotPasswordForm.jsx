import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useForgetMutation } from '../../../mutations/forget.mutation';
import { ForgotPasswordSchema } from '../../../schemas/schemas';

export default function ForgotPasswordForm() {
  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

  const { mutate, isLoading } = useForgetMutation(setError);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(mutate)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name='email'
          label='Email address'
          isSubmitted={isSubmitted}
          register={{ ...register('email') }}
        />

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading}
        >
          Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
