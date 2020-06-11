import { defineMessages } from 'react-intl'

export const scope = 'main.SignIn'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login Page',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Create an Account',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Forgot password?',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required.',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Email is not valid.',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Password is required.',
  },
})
