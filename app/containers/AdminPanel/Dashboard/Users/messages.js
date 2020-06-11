import { defineMessages } from 'react-intl'

export const scope = 'User.Dashboard.Main'

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'User Accounts',
  },
  selectColumns: {
    id: `${scope}.selectColumns`,
    defaultMessage: 'Select Columns',
  },
  selectColumnDesc: {
    id: `${scope}.selectColumnDesc`,
    defaultMessage: 'Select which columns to include and \n' +
      'drag and drop them to rearrange.',
  },
  Apply: {
    id: `${scope}.Apply`,
    defaultMessage: 'Apply',
  },
  setAsDefault: {
    id: `${scope}.setAsDefault`,
    defaultMessage: 'Set as Default',
  },
})
