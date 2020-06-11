import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Auth.ResetPassword'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Reset Password Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Please choose a new password',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New Password',
  },
  confirmNewPassword: {
    id: `${scope}.confirmNewPassword`,
    defaultMessage: 'Confirm New Password',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'New Password is required.',
  },
  passwordNotValid: {
    id: `${scope}.passwordNotValid`,
    defaultMessage:
      'Password must contain at least 1 uppercase, 1 number and 1 special character.',
  },
  passwordLength: {
    id: `${scope}.passwordLength`,
    defaultMessage: 'Password must be at least 8 characters.',
  },
  confirmPasswordRequired: {
    id: `${scope}.confirmPasswordRequired`,
    defaultMessage: 'Confirm New Password is required',
  },
  passwordNotMatch: {
    id: `${scope}.passwordNotMatch`,
    defaultMessage: 'New Password and Confirm New Password are not matched.',
  },
  resetPassword: {
    id: `${scope}.resetPassword`,
    defaultMessage: 'Reset Password',
  },
})
