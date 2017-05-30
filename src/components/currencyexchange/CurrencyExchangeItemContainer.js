import React from 'react';
import {connect} from 'react-redux';
import CurrencyExchangeItem from './CurrencyExchangeItem';
import {PREPARE_FOR_CURRENCY_INPUT, CURRENCY_INPUT, CANCEL_CURRENCY_INPUT} from '../../actions/CurrencyExchangeActions'


function mapStateToProps(state, ownProps)
{
  const currencyExchange = state.currencyExchange;

  const isDebit = ownProps.debit;
  const currencyValue = isDebit ? currencyExchange.sourceCurrencyValue : currencyExchange.destinationCurrencyValue;
  const preparedForInput = isDebit ? currencyExchange.sourceCurrencyPreparedForInput : currencyExchange.destinationCurrencyPreparedForInput;
  const selectedCurrency = isDebit ? currencyExchange.sourceCurrency : currencyExchange.destinationCurrency;
  const selected = selectedCurrency === ownProps.sourceCurrency;
  const destinationCurrency = isDebit ? currencyExchange.destinationCurrency : currencyExchange.sourceCurrency;
  const amount = currencyExchange.userFunds[ownProps.sourceCurrency];
  const rates = currencyExchange.exchangeRates;

  return {
    currencyValue, preparedForInput, destinationCurrency, amount, rates, selected
  }
}

function mapDispatchToProps(dispatch, ownProps)
{
  return {
    decimalInputFocusHandler: () => dispatch(PREPARE_FOR_CURRENCY_INPUT(ownProps.debit)),
    decimalInputBlurHandler : () => dispatch(CANCEL_CURRENCY_INPUT(ownProps.debit)),
    decimalInputValueChangeHandler : (value) => dispatch(CURRENCY_INPUT(value, ownProps.debit)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyExchangeItem);