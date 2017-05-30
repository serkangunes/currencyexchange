import React from 'react';
import CurrencyExchangeHeaderContainer from '../header/CurrencyExchangeHeaderContainer';
import CurrencyExchangeItemListContainer from './CurrencyExchangeItemListContainer';

import c from '../../common/common.styl';
import s from './currency-exchange.styl';


export default class CurrencyExchange extends React.Component
{
  render()
  {
    return (
      <div className={c['main'] + ' mui--bg-primary'}>
        <CurrencyExchangeHeaderContainer/>
        <CurrencyExchangeItemListContainer debit={true}
                                           currencies={this.props.currencies}
                                           className="mui--bg-primary mui--text-light"/>
        <div className={s['separator']}>
          <div className={s['triangle']}/>
        </div>
        <CurrencyExchangeItemListContainer debit={false}
                                           currencies={this.props.currencies}
                                           className="mui--bg-primary-dark mui--text-light"/>
      </div>
    );
  }
}