import { defineMessages } from 'react-intl'

export const scope = 'main.BankingInfo'

export default defineMessages({
  yourCatalog: {
    id: `${scope}.yourCatalog`,
    defaultMessage: 'Your Catalog',
  },
  bankingInfo: {
    id: `${scope}.bankingInfo`,
    defaultMessage: 'Banking Info',
  },
  skuCatalog: {
    id: `${scope}.skuCatalog`,
    defaultMessage: 'APPROXIMATE NUMBER OF SKUS IN CATALOG',
  },
  skuCatalogRequired: {
    id: `${scope}.skuCatalogRequired`,
    defaultMessage: 'Choosing SKU is required.',
  },
  skuAveragePrice: {
    id: `${scope}.skuAveragePrice`,
    defaultMessage: 'AVERAGE PRODUCT PRICE RANGE',
  },
  skuAveragePriceAvgPrice: {
    id: `${scope}.skuAveragePriceAvgPrice`,
    defaultMessage: 'Choosing Average Price is required.',
  },
  categories: {
    id: `${scope}.categories`,
    defaultMessage:
      'Please select which categories which best describe your catalog.',
  },
  yourProducts: {
    id: `${scope}.yourProducts`,
    defaultMessage: 'Your Products',
  },
  usedProducts: {
    id: `${scope}.usedProducts`,
    defaultMessage: 'Do you sell used products?',
  },
  policies: {
    id: `${scope}.policies`,
    defaultMessage: 'Do your products adhere to Map or RPM policies?',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  businessPresence: {
    id: `${scope}.businessPresence`,
    defaultMessage: 'Business Presence',
  },
})
