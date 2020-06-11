import { defineMessages } from 'react-intl';

export const scope = 'AdminPanel.Dashboard.GeneralOverview';

export default defineMessages({
  newsFromHomitag: {
    id: `${scope}.newsFromHomitag`,
    defaultMessage: 'News from Homitag',
  },
  readMoreArticles: {
    id: `${scope}.readMoreArticles`,
    defaultMessage: 'Read More Articles',
  },
  noItem: {
    id: `${scope}.noItem`,
    defaultMessage: 'Sorry. No item to show',
  },
});
