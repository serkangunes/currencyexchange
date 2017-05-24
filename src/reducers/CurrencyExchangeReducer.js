import {CurrencyExchangeActionTypes} from '../actions/CurrencyExchangeActions';
import {getRate, formatNumber} from '../common/NumberUtils';
import defaultState from '../common/DefaultState';


const currencyExchange = (state, action) =>
{
  let update;

  switch(action.type)
  {
    case CurrencyExchangeActionTypes.CHANGE_CURRENCY:
      update = {};
      update[(action.isDebit ? 'sourceCurrency' : 'destinationCurrency')] = action.currency;
      update['sourceCurrencyValue'] = NaN;
      update['destinationCurrencyValue'] = NaN;
      return Object.assign({}, state, update);
    case CurrencyExchangeActionTypes.PREPARE_FOR_CURRENCY_INPUT:
      update = {};
      update[(action.isDebit ? 'sourceCurrencyPreparedForInput' : 'destinationCurrencyPreparedForInput')] = true;
      return Object.assign({}, state, update);
    case CurrencyExchangeActionTypes.CURRENCY_INPUT:
      update = {};

      const rate = getRate(state.sourceCurrency, state.destinationCurrency, state.exchangeRates);

      if (action.isDebit)
      {
        update.sourceCurrencyValue = formatNumber(action.value);
        update.destinationCurrencyValue = formatNumber(action.value * rate);
        update.readyForExchange = action.value <= state.userFunds[state.sourceCurrency];
      }
      else
      {
        update.destinationCurrencyValue = formatNumber(action.value);
        update.sourceCurrencyValue = formatNumber(action.value * rate);
        update.readyForExchange = action.value <= state.userFunds[state.sourceCurrency];
      }

      return Object.assign({}, state, update);
    case CurrencyExchangeActionTypes.CANCEL_CURRENCY_INPUT:
      update = {};
      update[(action.isDebit ? 'sourceCurrencyPreparedForInput' : 'destinationCurrencyPreparedForInput')] = false;
      return Object.assign({}, state, update);
    case CurrencyExchangeActionTypes.UPDATE_RATES:
      update = {};
      update.exchangeRates = action.rates;
      update.ratesReady = true;

      return Object.assign({}, state, update);
    case CurrencyExchangeActionTypes.COMPLETE_EXCHANGE:
      update = {};
      update.userFunds = Object.assign({}, state.userFunds, {
        [state.sourceCurrency]: state.userFunds[state.sourceCurrency] - Number(state.sourceCurrencyValue),
        [state.destinationCurrency]: state.userFunds[state.destinationCurrency] + Number(state.destinationCurrencyValue),
      });
      update.sourceCurrencyValue = NaN;
      update.destinationCurrencyValue = NaN;
      return Object.assign({}, state, update);
    default:
      return defaultState;
  }
};

export default currencyExchange;