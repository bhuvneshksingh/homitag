import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Onboarding.AboutYou'

export default defineMessages({
  aboutYou: {
    id: `${scope}.aboutYou`,
    defaultMessage: 'About You',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Your First Name',
  },
  firstNameRequired: {
    id: `${scope}.avgShipTimeRequired`,
    defaultMessage: 'Your first name is required.',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Your Last Name',
  },
  lastNameRequired: {
    id: `${scope}.lastNameRequired`,
    defaultMessage: 'Your last name is required.',
  },
  emailAddress: {
    id: `${scope}.emailAddress`,
    defaultMessage: 'Email Address',
  },
  emailAddressRequired: {
    id: `${scope}.emailAddressRequired`,
    defaultMessage: 'Email address is required.',
  },
  nationalId: {
    id: `${scope}.nationalId`,
    defaultMessage: 'National ID',
  },
  nationalIdRequired: {
    id: `${scope}.emailAddressRequired`,
    defaultMessage: 'National ID is required.',
  },
  nationalIdInvalid: {
    id: `${scope}.nationalIdNotValid`,
    defaultMessage: 'National ID is invalid.',
  },
  nationalIdLength: {
    id: `${scope}.nationalIdLength`,
    defaultMessage: 'National ID must be 9 digits.',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone Number',
  },
  phoneNumberRequired: {
    id: `${scope}.returns`,
    defaultMessage: 'Phone number is required.',
  },
  phoneNumberInvalid: {
    id: `${scope}.phoneNumberInvalid`,
    defaultMessage: 'Phone number is invalid.',
  },
  ext: {
    id: `${scope}.ext`,
    defaultMessage: 'Ext',
  },
  hear: {
    id: `${scope}.hear`,
    defaultMessage: 'How`d you hear about us ?',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  aboutYourBuss: {
    id: `${scope}.aboutYourBuss`,
    defaultMessage: 'About Your Business',
  },
})
