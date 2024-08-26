import { useEffect, useLayoutEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
// layouts
import { AuthApi } from '../api/Auth/auth.services';
import { useAuthStore } from '../zustand/auth.store';
import { useQuery } from 'react-query';
import { PaymentApi } from '../api/Payment/payment.services';
import { usePaymentStore } from '../zustand/payment.store';
import { Storage } from '../storage';
import { getRoutes } from './routes';

export default function Router() {
  const [currentState, setCurrentState] = useState('pending');
  const { setUserData, setUserState, userState, userData } = useAuthStore();
  const { setPlans } = usePaymentStore();

  const ALL_ROUTES = getRoutes(currentState, userData);
  const routes = useRoutes(ALL_ROUTES);

  
  const getCurrentUser = async () => {
    return await AuthApi.retrieveUserData();
  };

  const { refetch, isLoading } = useQuery('get-user-data', getCurrentUser, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
    },
    onError: () => {
      setUserState('not-auth');
      setCurrentState('not-auth');
    },
  });

  useQuery('get-payment-plans', PaymentApi.getSubscriptionPlans, {
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setPlans(succeedData.data);
    },
  });

  useEffect(() => {
    if (userState !== currentState) setCurrentState(userState);
  }, [userState]);

  const defineToken = async () => {
    const token = await Storage.getItem('accessToken');
    if (token) {
      refetch();
    } else {
      setUserState('not-auth');
      setCurrentState('not-auth');
    }
  };

  useLayoutEffect(() => {
    defineToken();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setCurrentState('pending');
    }
  }, [isLoading]);


  return currentState === 'pending' ? (
    <></>
  ) : (
    routes
  );
}
