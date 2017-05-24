import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import AppReducers from '../reducers/AppReducers';
import {fetchRates} from '../actions/CurrencyExchangeActions';
import defaultState from '../common/DefaultState';

const loggerMiddleware = createLogger();


const store = createStore(AppReducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

store.dispatch(fetchRates(defaultState.currencies));

setInterval(function ()
{
  store.dispatch(fetchRates(defaultState.currencies));
}, 30000);

export default store;