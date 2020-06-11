import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Onboarding.BusinessPresence'

export default defineMessages({
  businessPresence: {
    id: `${scope}.businessPresence`,
    defaultMessage: 'Business Presence',
  },
  yourCatalog: {
    id: `${scope}.yourCatalog`,
    defaultMessage: 'Your Catalog',
  },
  onlinePresence: {
    id: `${scope}.onlinePresence`,
    defaultMessage: 'Online Presence',
  },
  websiteURL: {
    id: `${scope}.websiteURL`,
    defaultMessage: 'Website URL',
  },
  webURLNotValid: {
    id: `${scope}.webURLNotValid`,
    defaultMessage: 'Please enter a valid Website URL',
  },
  marketplaces: {
    id: `${scope}.marketplaces`,
    defaultMessage: 'Select any other marketplaces you sell on',
  },
  otherMarketplaces: {
    id: `${scope}.otherMarketplaces`,
    defaultMessage: 'Other Marketplaces',
  },
  otherInformation: {
    id: `${scope}.otherInformation`,
    defaultMessage: 'Other Information',
  },
  invertory: {
    id: `${scope}.invertory`,
    defaultMessage: 'Do you own your inventory?',
  },
  physicalRetail: {
    id: `${scope}.usedProducts`,
    defaultMessage: 'Do you operate a physical retail shop?',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  shippingAndReturns: {
    id: `${scope}.shippingAndReturns`,
    defaultMessage: 'Shipping + Returns',
  },
})
