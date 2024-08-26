import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/auth/AuthLayout';
import LogoOnlyLayout from '../layouts/auth/LogoOnlyLayout';
import DashboardLayout from '../layouts/dashboard';
import { Storage } from '../storage';

// Authentication
const Register = lazy(() => import('../pages/auth/Register'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const SuccessView = lazy(() => import('../pages/auth/SuccessView'));
const SignInCallback = lazy(() => import('../pages/auth/signInCallback'));
const EmailVerification = lazy(() => import('../pages/auth/emailVerification'));
const EmailSended = lazy(() => import('../pages/auth/emailSended'));
// Landing page
const Landing = lazy(() => import('../pages/Landing'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));
// Dashboard
const General = lazy(() => import('../pages/dashboard/General'));
const Pricing = lazy(() => import('../pages/dashboard/Pricing'));
const AppliedJobs = lazy(() => import('../pages/dashboard/AppliedJobs'));
const EditResume = lazy(() => import('../pages/dashboard/EditResume'));
const Profile = lazy(() => import('../pages/dashboard/Profile'));
// Payment
const PaymentStatus = lazy(() => import('../pages/dashboard/PaymentStatus'));

export const getRoutes = (state, userData) => {
  const not_auth_routes =
    state === 'not-auth'
      ? [
          {
            path: 'auth',
            element: <AuthLayout />,
            children: [
              { path: 'register', element: <Register /> },
              { path: 'login', element: <Login /> },
              { path: 'forgot-password', element: <ForgotPassword /> },
              { path: 'reset-password', element: <ResetPassword /> },
              { path: 'email-verify', element: <EmailVerification /> },
              { path: 'sended', element: <EmailSended /> },
            ],
          },
          {
            path: 'auth',
            element: <LogoOnlyLayout />,
            children: [{ path: 'success', element: <SuccessView /> }],
          },
          {
            path: '/',
            element: <AuthLayout />,
            children: [
              { element: <Landing />, index: true },
              { path: 'pricing', element: <Pricing /> },
              { path: 'privacy-policy', element: <PrivacyPolicy /> },
              { path: 'terms', element: <Terms /> },
            ],
          },
        ]
      : [];

  const auth_routes =
    state === 'auth'
      ? [
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              {
                path: '',
                element: <Navigate to='/dashboard/general' replace />,
              },
              { path: 'general', element: <General /> },
              { path: 'pricing', element: <Pricing /> },
              { path: 'applied-jobs', element: <AppliedJobs /> },
              {
                path: 'edit-resume',
                element: userData?.resumes?.length ? (
                  <EditResume />
                ) : (
                  <Navigate to='/dashboard/general' replace />
                ),
              },
              { path: 'profile', element: <Profile /> },
            ],
          },
        ]
      : [];

  const all_routes = [
    ...not_auth_routes,
    ...auth_routes,
    {
      path: 'payment',
      element: <AuthLayout />,
      children: [{ path: 'status', element: <PaymentStatus /> }],
    },
    {
      path: 'auth/callback',
      element: <SignInCallback />,
    },
    {
      path: 'payment-status',
      element: Storage.getItem('old-subscription-id') ? (
        <PaymentStatus />
      ) : (
        <Navigate
          to={state === 'auth' ? '/dashboard/general' : '/auth/login'}
        />
      ),
    },
    {
      path: '*',
      element: (
        <Navigate
          to={state === 'auth' ? '/dashboard/general' : '/auth/login'}
        />
      ),
    },
  ];

  return all_routes;
};
