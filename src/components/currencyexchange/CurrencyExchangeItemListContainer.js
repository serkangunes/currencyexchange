import React from 'react';
import {connect} from 'react-redux';
import CurrencyItemList from './CurrencyExchangeItemList';

import {CHANGE_CURRENCY} from '../../actions/CurrencyExchangeActions'

function mapStateToProps(state, ownProps)
{

  const currencyExchange = state.currencyExchange;

  const isDebit = ownProps.debit;
  const selectedCurrency = isDebit ? currencyExchange.sourceCurrency : currencyExchange.destinationCurrency;
  const currencies = ownProps.currencies;

  return {
    currencies,
    selectedCurrency
  }
}

function mapDispatchToProps(dispatch, ownProps)
{
  return {
    selectedCurrencyChangeHandler : (index) =>
    {
      const sourceCurrency = ownProps.currencies.get(index);
      const debit = ownProps.debit;

      dispatch(CHANGE_CURRENCY(sourceCurrency, debit));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyItemList);