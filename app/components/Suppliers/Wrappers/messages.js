import { defineMessages } from 'react-intl'

export const scope = 'main.AccountWrapper'

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Before getting started, please complete a brief onboarding to let us know a bit about your business.',
  },
  agreement: {
    id: `${scope}.agreement`,
    defaultMessage: 'By signing up of logging in you agree to our',
  },
  terms: {
    id: `${scope}.terms`,
    defaultMessage: 'Terms & Conditions',
  },
  and: {
    id: `${scope}.and`,
    defaultMessage: 'and',
  },
  policy: {
    id: `${scope}.policy`,
    defaultMessage: 'Privacy Policy',
  },
})
