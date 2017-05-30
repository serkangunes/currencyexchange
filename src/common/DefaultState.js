import Immutable from 'immutable';

const defaultState = {
  currencies: Immutable.List(['GBP', 'USD', 'EUR']),
  userFunds: {
    GBP: 20,
    USD: 5,
    EUR: 10
  },
  exchangeRates: {
    GBPUSD: 1.3,
    GBPEUR: 1.1,
    EURUSD: 1.2
  },
  sourceCurrency: 'GBP',
  sourceCurrencyPreparedForInput: false,
  sourceCurrencyValue: NaN,
  destinationCurrency: 'EUR',
  destinationCurrencyPreparedForInput: false,
  destinationCurrencyValue: NaN,
  readyForExchange: false,
  ratesReady: true
};

export default defaultState;