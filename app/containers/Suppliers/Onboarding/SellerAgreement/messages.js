import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Onboarding.BankingInfo'

export default defineMessages({
  sellerAgreement: {
    id: `${scope}.sellerAgreement`,
    defaultMessage: 'Seller`s Agreement',
  },
  shippingAndReturns: {
    id: `${scope}.shippingAndReturns`,
    defaultMessage: 'Shipping + Returns',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Please read and agree to Homitag`s terms of service below.',
  },
  firstParagraph: {
    id: `${scope}.firstParagraph`,
    defaultMessage:
      'THIS AGREEMENT CONTAINS THE TERMS AND CONDITIONS THAT GOVERN YOUR ACCESS TO AND USE OF THE SERVICES THROUGH A PARTICULAR ACCOUNT OR ACCOUNTS AND IS AN AGREEMENT BETWEEN YOU OR THE BUSINESS YOU REPRESENT ("YOU") AND DIRECT CREATE PRIVATE LIMITED. BY REGISTERING FOR OR USING THE SERVICES, YOU (ON BEHALF OF YOURSELF OR THE BUSINESS YOU REPRESENT) AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT, INCLUDING THE SERVICE TERMS AND PROGRAMME POLICIES FOR EACH SERVICE YOU REGISTER FOR OR USE IN CONNECTION WITH THE DIRECT CREATE SITE.',
  },
  secondParagraph: {
    id: `${scope}.secondParagraph`,
    defaultMessage:
      'As used in this Agreement, "we," "us," and "Direct Create" means the Direct Create Private Limited company named in the applicable Service Terms. Capitalized terms have the meanings listed in the Definitions below. If there is any conflict between these General Terms and the applicable Service Terms, the Service Terms will govern.',
  },
  thirdParagraph: {
    id: `${scope}.thirdParagraph`,
    defaultMessage:
      'The General policies applicable for all the visitors, users and members of Direct Create as regards its software, mobile or web application/s, website, online and offline resources and marketplace are an integral part of this agreement. In addition to these General policies there may be specific policies governing separate “Programmes” or “Services” (Programme Policies) of Direct Create, These Specific policies shall form an integral part of this agreement in as much as it applies to Sellers.',
  },
  fourthParagraph: {
    id: `${scope}.fourthParagraph`,
    defaultMessage:
      'The Policies which are part of this agreement include but not limited to – Terms of Use, Privacy Policy, Software Terms, Community Policy, The Specific Polices which applies to Sellers which are an integral part of this agreement, include but is not limited to - Listing Policy-Sellers, Returns and Refunds,etc.',
  },
  read: {
    id: `${scope}.read`,
    defaultMessage: 'I`ve read and agree to Homitag`s',
  },
  agreement: {
    id: `${scope}.agreement`,
    defaultMessage: 'Seller Agreement',
  },
  agreementRequired: {
    id: `${scope}.agreementRequired`,
    defaultMessage: 'Accepting Seller Agreement is required.',
  },
  completeOnboarding: {
    id: `${scope}.completeOnboarding`,
    defaultMessage: 'Complete Onboarding',
  },
})
