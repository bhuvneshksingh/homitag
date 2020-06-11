import { defineMessages } from 'react-intl';

export const scope = 'main.SignIn';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Forgot Password Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Please, enter the E-mail associated with your Homitag account. We will send you an E-mail with the instructions to reset your password.',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required.',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Email is not valid.',
  },
  sendLink: {
    id: `${scope}.sendLink`,
    defaultMessage: 'Send Password Reset Link',
  },
  checkEmail: {
    id: `${scope}.checkEmail`,
    defaultMessage: 'Please check your email for password reset link.',
  },
});
