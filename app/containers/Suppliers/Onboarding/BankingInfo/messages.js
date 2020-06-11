import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Onboarding.BankingInfo'

export default defineMessages({
  bankingInfo: {
    id: `${scope}.bankingInfo`,
    defaultMessage: 'Banking Info',
  },
  yourBusiness: {
    id: `${scope}.yourBusiness`,
    defaultMessage: 'Your Business',
  },
  accountHolderName: {
    id: `${scope}.accountHolderName`,
    defaultMessage: 'Bank Account Holder Name',
  },
  accountHolderType: {
    id: `${scope}.accountHolderType`,
    defaultMessage: 'Bank Account Holder Type',
  },
  accountHolderTypeIndividual: {
    id: `${scope}.accountHolderTypeIndividual`,
    defaultMessage: 'Individual',
  },
  accountHolderTypeCompany: {
    id: `${scope}.accountHolderTypeCompany`,
    defaultMessage: 'Company',
  },
  bankAccountNumber: {
    id: `${scope}.bankAccountNumber`,
    defaultMessage: 'Bank Account Number',
  },
  confirmAccountNumber: {
    id: `${scope}.confirmAccountNumber`,
    defaultMessage: 'Confirm Account Number',
  },
  routingNumber: {
    id: `${scope}.routingNumber`,
    defaultMessage: 'Routing Number',
  },
  accountHolderNameRequired: {
    id: `${scope}.accountHolderNameRequired`,
    defaultMessage: 'Bank account holder name is required.',
  },
  accountHolderTypeRequired: {
    id: `${scope}.accountHolderTypeRequired`,
    defaultMessage: 'Bank account holder type is required.',
  },
  bankAccountRequried: {
    id: `${scope}.bankAccountRequried`,
    defaultMessage: 'Bank account number is required.',
  },
  bankAccountCharCount: {
    id: `${scope}.bankAccountCharCount`,
    defaultMessage: 'Bank account number must be 12 digits.',
  },
  bankAccountConfirmRequried: {
    id: `${scope}.bankAccountConfirmRequried`,
    defaultMessage: 'Confirm account number is required.',
  },
  bankAccountsNotMatch: {
    id: `${scope}.bankAccountsNotMatch`,
    defaultMessage: "Account and Account confirm don't match.",
  },
  bankAccountInvalid: {
    id: `${scope}.bankAccountInvalid`,
    defaultMessage: 'Bank account number is invalid.',
  },
  rotingNumberRequired: {
    id: `${scope}.rotingNumberRequired`,
    defaultMessage: 'Routing number is required.',
  },
  rotingNumberInvalid: {
    id: `${scope}.rotingNumberInvalid`,
    defaultMessage: 'Routing number is invalid.',
  },
  rotingNumberCharCount: {
    id: `${scope}.rotingNumberCharCount`,
    defaultMessage: 'Routing number must be 9 digits.',
  },
  createBankUserAccountError: {
    id: `${scope}.createBankUserAccountError`,
    defaultMessage:
      'Error while creating bank account. Please call system administrator.',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  yourCatalog: {
    id: `${scope}.yourCatalog`,
    defaultMessage: 'Your Catalog',
  },
})
