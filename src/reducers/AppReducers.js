import {combineReducers} from 'redux';
import currencyExchange from './CurrencyExchangeReducer'

const AppReducers = combineReducers({
  currencyExchange
});

export default AppReducers;