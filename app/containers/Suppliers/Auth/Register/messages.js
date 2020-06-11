import { defineMessages } from 'react-intl'

export const scope = 'main.SignIn'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Register Page',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First Name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last Name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  passwordConfirm: {
    id: `${scope}.passwordConfirm`,
    defaultMessage: 'Confirm Password',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'Create an Supplier Account',
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
  passwordConfirmRequired: {
    id: `${scope}.passwordConfirmRequired`,
    defaultMessage: 'Password Confirm is required.',
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
  firstNameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'First Name is required.',
  },
  lastNameRequired: {
    id: `${scope}.lastNameRequired`,
    defaultMessage: 'Last Name is required.',
  },
  passwordNotMatch: {
    id: `${scope}.passwordNotMatch`,
    defaultMessage: 'Password and its confirm do not match.',
  },
})
