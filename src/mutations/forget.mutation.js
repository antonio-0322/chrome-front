import { useMutation, useQueryClient } from 'react-query'
import { AuthApi } from '../api/Auth/auth.services'
import { useNavigate } from 'react-router-dom'


export const useForgetMutation = (errorSetter) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation(
    ['forget'],
    async (data) => {
      await AuthApi.forgetPassword({...data, email: encodeURIComponent(data.email), email_type: 'reset_password'})
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['forget']);
        navigate('/auth/sended', {state: {
          email: variables.email,
          email_type: 'reset_password'
        }})
      },
    onError: (err) => {
      const error = err?.response.data
      if (error?.detail) {
        errorSetter('email', {
          type: 'custom',
          message: error.detail,
        })
      }
    },
  },
  )
}