import 'babel-polyfill';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store/CurrencyExchangeStore'
import CurrencyExchangeContainer from './components/currencyexchange/CurrencyExchangeContainer'

let reactElement = document.getElementById('mount');

render(
  <Provider store={store}>
    <CurrencyExchangeContainer />
  </Provider>,
  reactElement
);