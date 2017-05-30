import React from 'react';
import {connect} from 'react-redux';
import CurrencyExchangeHeader from './CurrencyExchangeHeader';
import {COMPLETE_EXCHANGE} from '../../actions/CurrencyExchangeActions'


function mapStateToProps(state)
{
  const currencyExchange = state.currencyExchange;

  const sourceCurrency = currencyExchange.sourceCurrency;
  const destinationCurrency = currencyExchange.destinationCurrency;
  const rates = currencyExchange.exchangeRates;
  const readyForExchange = currencyExchange.readyForExchange;

  return {
    sourceCurrency, destinationCurrency, rates, readyForExchange
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    exchangeClickHandler: () => {
      dispatch(COMPLETE_EXCHANGE());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyExchangeHeader);