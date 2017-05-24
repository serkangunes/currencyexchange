import React from 'react';
import {connect} from 'react-redux'
import {getSymbol} from '../../common/CurrencySymbols';
import {formatCurrency, getRate} from '../../common/NumberUtils';
import {COMPLETE_EXCHANGE} from '../../actions/CurrencyExchangeActions'

import s from './header.styl';


class CurrencyExchangeHeader extends React.Component
{
  render()
  {
    const sourceCurrency = this.props.sourceCurrency;
    const destinationCurrency = this.props.destinationCurrency;
    const exchangeRates = this.props.rates;

    const currencySymbol = getSymbol(sourceCurrency);
    const rate = formatCurrency(destinationCurrency, getRate(sourceCurrency, destinationCurrency, exchangeRates), 4);
    const rateFormatted = rate.substring(0, rate.length - 2) + '<small>' + rate.substring(rate.length - 2) + '</small>';

    const rateString = sourceCurrency === destinationCurrency ? 'Rates' : `${currencySymbol}1 = ${rateFormatted}`;

    return (
      <div className={s['header-container']}>
        <div className={s['header-exchange-left-spacer']}/>
        <div className={s['header-exchange-rate-container']}>
          <span className={'mui--text-light mui--text-center ' + s['header-exchange-rate']}>
            <span dangerouslySetInnerHTML={{__html: rateString}}/>
            <span className="mui-caret"/>
          </span>
        </div>
        <div className={s['header-exchange-actions']}>
          <button className={s['header-exchange-button'] + ' mui-btn mui-btn--small mui-btn--primary'}
                  disabled={!this.props.readyForExchange}
                  onClick={() => this.props.dispatch(COMPLETE_EXCHANGE())}>
            Exchange
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CurrencyExchangeHeader);