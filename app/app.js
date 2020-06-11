import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import FontFaceObserver from 'fontfaceobserver'
import { StripeProvider } from 'react-stripe-elements'
import history from 'utils/history'
import './theme/reset.css'

import { stripeApiKey } from 'config'
import App from 'containers/App'
import LanguageProvider from 'containers/LanguageProvider'
/* eslint-disable import/no-unresolved, import/extensions */
import 'file-loader?name=.htaccess!./.htaccess'
/* eslint-enable import/no-unresolved, import/extensions */
import configureStore from './configureStore'
import { translationMessages } from './i18n'

const montserratObserver = new FontFaceObserver('Montserrat', {})

// When Montserrat is loaded, add a font-family using Montserrat to the body
montserratObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
})

const initialState = {}
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <StripeProvider apiKey={stripeApiKey}>
            <App />
          </StripeProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  )
}

if (module.hot) {
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
