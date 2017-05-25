import React from 'react';
import {connect} from 'react-redux';
import CurrencyExchange from './CurrencyExchange';
import Loading from 'react-loading-animation';
import c from '../../common/common.styl';

class CurrencyExchangeContainer extends React.Component
{
  render()
  {
    const rates = this.props.currencyExchange.exchangeRates;
    const userFunds = this.props.currencyExchange.userFunds;
    const currencies = this.props.currencyExchange.currencies;
    const sourceCurrency = this.props.currencyExchange.sourceCurrency;
    const sourceCurrencyPreparedForInput = this.props.currencyExchange.sourceCurrencyPreparedForInput;
    const sourceCurrencyValue = this.props.currencyExchange.sourceCurrencyValue;
    const destinationCurrency = this.props.currencyExchange.destinationCurrency;
    const destinationCurrencyPreparedForInput = this.props.currencyExchange.destinationCurrencyPreparedForInput;
    const destinationCurrencyValue = this.props.currencyExchange.destinationCurrencyValue;
    const readyForExchange = this.props.currencyExchange.readyForExchange;
    const ratesReady =  this.props.currencyExchange.ratesReady;

    if (!ratesReady)
    {
      return <div className={c['loading']}><Loading/></div>;
    }

    return (
      <CurrencyExchange currencies={currencies}
                        rates={rates}
                        userFunds={userFunds}
                        sourceCurrency={sourceCurrency}
                        sourceCurrencyPreparedForInput={sourceCurrencyPreparedForInput}
                        sourceCurrencyValue={sourceCurrencyValue}
                        destinationCurrencyPreparedForInput={destinationCurrencyPreparedForInput}
                        destinationCurrency={destinationCurrency}
                        destinationCurrencyValue={destinationCurrencyValue}
                        readyForExchange={readyForExchange}/>
    );
  }
}

function mapStateToProps(state)
{
  return {
    currencyExchange: state.currencyExchange
  }
}

export default connect(mapStateToProps)(CurrencyExchangeContainer);
