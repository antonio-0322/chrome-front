import { useMutation, useQueryClient } from 'react-query';
import { AuthApi } from '../api/Auth/auth.services';
import { useNavigate } from 'react-router-dom';

export const useRegisterMutation = (errorSetter) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    ['register'],
    async (data) => {
      await AuthApi.registerUser(data);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['register']);
        navigate('/auth/sended', {
          state: {
            email: variables.email,
            email_type: 'activate_account',
          },
        });
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
      },
    },
  );
};
