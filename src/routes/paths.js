// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_PAYMENT = '/payment';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  callback: path(ROOTS_AUTH, '/callback'),
  emailVerify: path(ROOTS_AUTH, '/email_verify'),
};

export const PATH_PAGE = {
  policies: '/privacy-policy',
  terms: '/terms',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: path(ROOTS_DASHBOARD, '/general'),
  pricing: path(ROOTS_DASHBOARD, '/pricing'),
  appliedJobs: path(ROOTS_DASHBOARD, '/applied-jobs'),
  editResume: path(ROOTS_DASHBOARD, '/edit-resume'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
};

export const PATH_PAYMENT = {
  root: ROOTS_PAYMENT,
  status: path(ROOTS_PAYMENT, '/status'),
};
