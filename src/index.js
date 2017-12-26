import 'whatwg-fetch'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import App from './components/App'
import './css/Base.scss'
import store from './api'

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)
