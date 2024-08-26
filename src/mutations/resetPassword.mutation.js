import { useMutation, useQueryClient } from 'react-query';
import { AuthApi } from '../api/Auth/auth.services';
import { useNavigate } from 'react-router-dom';

export const useResetPassMutation = (errorSetter, code, email) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    ['resetPass'],
    async (data) => {
      await AuthApi.resetPassword({ ...data, code, email });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['resetPass']);
        navigate('/auth/success');
      },
      onError: (err) => {
        const error = err?.response.data;
        if (error?.email) {
          errorSetter('email', {
            type: 'custom',
            message: error.email,
          });
        }

        if (error?.password) {
          errorSetter('password', {
            type: 'custom',
            message: error.password,
          });
        }

        if (
          error?.detail?.includes(
            'There was an error verifying your email address.',
          )
        ) {
          errorSetter('verify', {
            type: 'custom',
            message: error.detail,
          });
        }

        if (error?.detail) {
          errorSetter('general', {
            type: 'custom',
            message: error.detail,
          });
        }
      },
    },
  );
};
