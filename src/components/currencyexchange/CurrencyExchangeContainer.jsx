import React from 'react';
import {connect} from 'react-redux';
import CurrencyExchange from './CurrencyExchange';
import Loading from 'react-loading-animation';
import c from '../../common/common.styl';

class CurrencyExchangeContainer extends React.Component
{
  render()
  {
    const ratesReady =  this.props.currencyExchange.ratesReady;

    if (!ratesReady)
    {
      return <div className={c['loading']}><Loading/></div>;
    }

    return (
      <CurrencyExchange currencies={this.props.currencyExchange.currencies}/>
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
