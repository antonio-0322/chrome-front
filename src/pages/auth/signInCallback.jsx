import React, { useEffect } from 'react';

import { AuthApi } from '../../api/Auth/auth.services';
import { Storage } from '../../storage';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../zustand/auth.store';
import { useQuery } from 'react-query';

export default function SignInCallback() {
  const navigate = useNavigate();
  const { setUserState, setUserData } = useAuthStore();

  const path = Storage.getItem("googleLoginFrom", false);

  let params = new URLSearchParams(window.location.search);
  const error = params.get('error');

  let code = params.get('code');

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
    },
    onError: () => {
      setUserState('not-auth');
    },
  });

  useEffect(() => {
    async function sendCallback() {
      const response = await AuthApi.googleLogIn({
        code: code,
        redirect_url: `${window.location.origin}/auth/callback`,
      });

      if (response.status === 200) {
        refetch();
        Storage.setItem('accessToken', response.data.access);
        Storage.setItem('refreshToken', response.data.refresh);
        Storage.setItem('loginWithAuth0', true);
        navigate('/dashboard/general');
      } else {
        navigate('/auth/login');
      }
    }
    code !== '' && sendCallback();
  }, [code]);

  useEffect(() => {
    if(error === "access_denied" && path) navigate(path);
  },[error])

  return <></>;
}
