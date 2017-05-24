import React from 'react';
import {connect} from 'react-redux'

import {formatCurrency} from '../../common/NumberUtils';
import {getRate} from '../../common/NumberUtils';
import {getSymbol} from '../../common/CurrencySymbols';
import {PREPARE_FOR_CURRENCY_INPUT, CURRENCY_INPUT, CANCEL_CURRENCY_INPUT} from '../../actions/CurrencyExchangeActions'
import DecimalInput from '../decimalinput/DecimalInput';
import s from './currency-exchange.styl';


class CurrencyExchangeItem extends React.Component
{
  constructor(props)
  {
    super(props);

    this.decimalInputFocusHandler = this.decimalInputFocusHandler.bind(this);
    this.decimalInputBlurHandler = this.decimalInputBlurHandler.bind(this);
    this.decimalInputValueChangeHandler = this.decimalInputValueChangeHandler.bind(this);
  }

  decimalInputFocusHandler()
  {
    this.props.dispatch(PREPARE_FOR_CURRENCY_INPUT(this.props.debit));
  }

  decimalInputBlurHandler()
  {
    this.props.dispatch(CANCEL_CURRENCY_INPUT(this.props.debit));
  }

  decimalInputValueChangeHandler(value)
  {
    this.props.dispatch(CURRENCY_INPUT(value, this.props.debit));
  }

  render()
  {
    const sourceCurrency = this.props.sourceCurrency;
    const currencyValue = this.props.currencyValue;
    const destinationCurrency = this.props.destinationCurrency;
    const exchangeRates = this.props.rates;
    const amount = formatCurrency(sourceCurrency, this.props.amount);
    const rate = formatCurrency(destinationCurrency, getRate(sourceCurrency, destinationCurrency, exchangeRates));
    const currencySymbol = getSymbol(sourceCurrency);
    const debit = this.props.debit;

    const youHaveString = `You have ${amount}`;
    const rateString = sourceCurrency === destinationCurrency || this.props.preparedForInput ? null : `${currencySymbol}1 = ${rate}`;

    const youHaveClassName = debit && currencyValue > this.props.amount ?  'mui--text-danger': '';

    return (
      <div className={this.props.className}>
        <div className={s['currency-exchange-item'] + ' mui--align-middle'}>
          <div className={s['currency-exchange-item-left-panel'] + ' mui--text-body2'}>
            <p className="mui--text-display2">{sourceCurrency}</p>
            <p className={youHaveClassName}>{youHaveString}</p>
          </div>
          <div className={s['currency-exchange-item-right-panel']}>
            <DecimalInput numberOfDecimals={2}
                          prefix={debit ? '-' : '+'}
                          value={currencyValue}
                          focus={this.decimalInputFocusHandler}
                          blur={this.decimalInputBlurHandler}
                          onDecimalValueChange={this.decimalInputValueChangeHandler}/>
            <p className="mui--text-right">{rateString}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CurrencyExchangeItem);