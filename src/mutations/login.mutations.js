import { useMutation, useQueryClient } from 'react-query';
import { AuthApi } from '../api/Auth/auth.services';
import { Storage } from '../storage';

export const useSignInMutation = (errorSetter) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['login'],
    async (data) => {
      const response = await AuthApi.logIn(data);
      Storage.setItem('accessToken', response.data.access);
      Storage.setItem('refreshToken', response.data.refresh);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user-info']);
        window.location.replace('/dashboard');
      },
      onError: (err) => {
        const error = err?.response;

        if (error?.data.password) {
          errorSetter('password', {
            type: 'custom',
            message: 'The password is incorrect.',
          });
        };
        if (error?.data.email) {
          errorSetter('email', {
            type: 'custom',
            message: error.data.email,
          })
        }
        if (error?.data.detail) {
          errorSetter('general', {
            type: 'custom',
            message: error.data.detail,
          })
        }
      },
    },
  );
};
