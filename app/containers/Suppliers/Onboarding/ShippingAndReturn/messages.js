import { defineMessages } from 'react-intl'

export const scope = 'main.BankingInfo'

export default defineMessages({
  shippingAndReturns: {
    id: `${scope}.shippingAndReturns`,
    defaultMessage: 'Shipping + Returns',
  },
  businessPresence: {
    id: `${scope}.businessPresence`,
    defaultMessage: 'Business Presence',
  },
  shipping: {
    id: `${scope}.shipping`,
    defaultMessage: 'Shipping',
  },
  avgShipTime: {
    id: `${scope}.avgShipTime`,
    defaultMessage: 'What`s your average ship time?',
  },
  avgShipTimeRequired: {
    id: `${scope}.avgShipTimeRequired`,
    defaultMessage: 'Average ship time is required.',
  },
  moreThan5Days: {
    id: `${scope}.moreThan5Days`,
    defaultMessage: '>5 Days',
  },
  lessThan5Days: {
    id: `${scope}.lessThan5Days`,
    defaultMessage: '<5 Days',
  },
  carriersRequired: {
    id: `${scope}.carriesRequired`,
    defaultMessage: 'Selecting carriers is required.',
  },
  carriers: {
    id: `${scope}.carriers`,
    defaultMessage: 'Which carriers do you use?',
  },
  dropShippersRequired: {
    id: `${scope}.dropShippersRequired`,
    defaultMessage: 'Defining drop shippers count is required.',
  },
  dropShippers: {
    id: `${scope}.dropShippers`,
    defaultMessage: 'How many drop shippers do you use?',
  },
  returns: {
    id: `${scope}.returns`,
    defaultMessage: 'Returns',
  },
  returnPolicy: {
    id: `${scope}.returnPolicy`,
    defaultMessage: "What's your return policy?",
  },
  freeReturns: {
    id: `${scope}.freeReturns`,
    defaultMessage: 'Free Returns',
  },
  buyerPays: {
    id: `${scope}.freeReturns`,
    defaultMessage: 'Buyer pays for returns',
  },
  other: {
    id: `${scope}.other`,
    defaultMessage: 'Other',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  sellerAgreement: {
    id: `${scope}.sellerAgreement`,
    defaultMessage: 'Seller`s Agreement',
  },
})
