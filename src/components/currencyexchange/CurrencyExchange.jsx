import React from 'react';
import CurrencyExchangeHeader from '../header/CurrencyExchangeHeader';
import CurrencyExchangeItemList from './CurrencyExchangeItemList';

import c from '../../common/common.styl';
import s from './currency-exchange.styl';


export default class CurrencyExchange extends React.Component
{
  render()
  {
    return (
      <div className={c['main'] + ' mui--bg-primary'}>
        <CurrencyExchangeHeader rates={this.props.rates}
                                sourceCurrency={this.props.sourceCurrency}
                                destinationCurrency={this.props.destinationCurrency}
                                readyForExchange={this.props.readyForExchange}/>
        <CurrencyExchangeItemList currencies={this.props.currencies}
                                  debit={true}
                                  userFunds={this.props.userFunds}
                                  rates={this.props.rates}
                                  selectedCurrency={this.props.sourceCurrency}
                                  destinationCurrency={this.props.destinationCurrency}
                                  preparedForInput={this.props.sourceCurrencyPreparedForInput}
                                  currencyValue={this.props.sourceCurrencyValue}
                                  className="mui--bg-primary mui--text-light"/>
        <div className={s['separator']}><div className={s['triangle']}/></div>
        <CurrencyExchangeItemList currencies={this.props.currencies}
                                  debit={false}
                                  userFunds={this.props.userFunds}
                                  rates={this.props.rates}
                                  selectedCurrency={this.props.destinationCurrency}
                                  destinationCurrency={this.props.sourceCurrency}
                                  preparedForInput={this.props.destinationCurrencyPreparedForInput}
                                  currencyValue={this.props.destinationCurrencyValue}
                                  className="mui--bg-primary-dark mui--text-light"/>
      </div>
    );
  }
}