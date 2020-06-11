import { defineMessages } from 'react-intl';

export const scope = 'main.SignIn';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Verification Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'We sent a code to {email}. Please enter it below to authenticate your account.',
  },
  mobileFormOpen: {
    id: `${scope}.mobileFormOpen`,
    defaultMessage: 'Please enter your phone number. We send a verification code to your number.',
  },
  mobileFormDone: {
    id: `${scope}.mobileFormDone`,
    defaultMessage: 'We send a code to {phonenumber}. Please enter it below to authenticate your account.',
  },
  cantFindCode: {
    id: `${scope}.cantFindCode`,
    defaultMessage: 'Can`t find the code',
  },
  sendToPhone: {
    id: `${scope}.sendToPhone`,
    defaultMessage: 'Send to my phone',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone Number',
  },
  phoneNumberRequired: {
    id: `${scope}.phoneNumberRequired`,
    defaultMessage: 'Phone Number is required.',
  },
  phoneNumberInvalid: {
    id: `${scope}.phoneNumberRequired`,
    defaultMessage: 'Phone Number is invalid.',
  },
  enterCode: {
    id: `${scope}.enterCode`,
    defaultMessage: 'Enter the code',
  },
  verify: {
    id: `${scope}.verify`,
    defaultMessage: 'Verify',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
});
