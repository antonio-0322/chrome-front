import * as Yup from 'yup';

export const emailRegExp =
  /^[a-zA-Z0-9]+([\.-\.+]?[a-zA-Z0-9]+([\+]?))*@[a-zA-Z]*(\.\w{2,3})+$/g;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Email must be a valid email address')
    .matches(emailRegExp, 'Please enter a valid email format.'),
  password: Yup.string().required('This field is required'),
});

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('This field is required')
    .max(25, 'This field must contain max 25 characters.'),
  last_name: Yup.string()
    .required('This field is required')
    .max(25, 'This field must contain max 25 characters.'),
  email: Yup.string()
    .required('This field is required')
    .matches(emailRegExp, 'Please enter a valid email format.')
    .email('Please enter a valid email format.'),
  password: Yup.string()
    .required('This field is required')
    .min(8, 'Password must have minimum 8 characters.'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('This field is required')
    .min(8, 'Password must have minimum 8 characters.'),
  terms: Yup.boolean().oneOf([true], 'Please accept the terms to proceed.'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required')
    .min(8, 'Password must have minimum 8 characters.'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('This field is required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .matches(emailRegExp, 'Please enter a valid email format.')
    .email('Please enter a valid email format.'),
});

export const EmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Please enter a valid email format.')
    .matches(emailRegExp, 'Please enter a valid email format.'),
});
