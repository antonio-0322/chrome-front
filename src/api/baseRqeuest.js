import axios from 'axios';

import { Storage } from '../storage';
import { AuthApi } from './Auth/auth.services';
import { useAuthStore } from '../zustand/auth.store';
import { VITE_BASE_URL } from '../utils/variablesFromEnv';

async function refreshTokenRequest(refreshToken) {
  return await AuthApi.refreshToken(`${refreshToken}`);
}

const baseConfig = {
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
};

export const ApiClient = axios.create(baseConfig);

let subscribers = [];
let isRefreshing = false;

function requestInterceptionHandler(config) {
  const accessToken = Storage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

async function responseFailureInterceptionHandler(error) {
  if (!error.response || error.response.status === 500) {
    // TODO handle redirection to IntervalServer page correctly
    return window.history.push && window.history.push('/not-found');
  }

  const originalConfig = error.config;

  // TODO check the expiration case correctly check with backend guys.

  if (
    error.response.status === 401 &&
    error.response?.data?.code === 'user_inactive'
  ) {
    useAuthStore.setState({ userState: 'not-auth' });
    Storage.clear();
    window.location.href = '/auth/login';
    return;
  }

  if (
    error.response.status === 401 &&
    !error.response.config.url.includes('/auth/login/')
  ) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        const result = await refreshTokenRequest(
          Storage.getItem('refreshToken'),
        );
        const { access, refresh } = result.data;
        Storage.setItem('accessToken', access);
        Storage.setItem('refreshToken', refresh);
        subscribers.map((cb) => cb(access));
        subscribers = [];
        isRefreshing = false;
      }

      addSubscriber((accessToken) => {
        originalConfig.headers.Authorization = 'Bearer ' + accessToken;
        return ApiClient(originalConfig);
      });
    } catch (_error) {
      useAuthStore.setState({ userState: 'not-auth' });
      Storage.clear();
      window.location.href = '/auth/login';
      return;
    }
  }
  return Promise.reject(error);
}

ApiClient.interceptors.request.use(requestInterceptionHandler, (error) =>
  Promise.reject(error),
);

ApiClient.interceptors.response.use(
  (res) => res,
  responseFailureInterceptionHandler,
);
