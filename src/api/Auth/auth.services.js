import { ApiClient } from '../baseRqeuest';
import {
  REGISTER_USER,
  LOGIN_USER,
  REFRESH_TOKEN,
  LOGOUT_USER,
  GOOGLE_LOGIN,
  ACTIVATE_USER,
  FORGET_PASSWORD,
  RESTORE_PASSWORD,
} from './auth.urls';

const logIn = async (data) => ApiClient.post(LOGIN_USER.login, data);

const registerUser = async (data) =>
  ApiClient.post(REGISTER_USER.register, data);

const googleLogIn = async (data) =>
  ApiClient.post(GOOGLE_LOGIN.googleLogin, data);

const logOut = async (token) =>
  ApiClient.post(LOGOUT_USER.logout, { params: token });

const refreshToken = async (token) =>
  ApiClient.post(REFRESH_TOKEN.refresh, { refresh: token });

const activateUser = async (params) =>
  ApiClient.patch(ACTIVATE_USER.activateUser, params);

const forgetPassword = async (params) =>
  ApiClient.get(
    `${FORGET_PASSWORD.forget}/${params.email}/${params.email_type}/`,
  );

const resetPassword = async (params) =>
  ApiClient.patch(RESTORE_PASSWORD.restore, params);

const retrieveUserData = () => ApiClient.get('user/profile/retrive/');

const updateUserDetails = (data) => ApiClient.put('user/profile/update/', data);

const changePasswordFromProfile = (data) =>
  ApiClient.patch('user/change-password/', data);

export const AuthApi = {
  logIn,
  logOut,
  googleLogIn,
  registerUser,
  refreshToken,
  activateUser,
  forgetPassword,
  resetPassword,
  retrieveUserData,
  updateUserDetails,
  changePasswordFromProfile,
};
