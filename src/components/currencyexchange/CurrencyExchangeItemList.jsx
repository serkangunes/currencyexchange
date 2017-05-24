import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {connect} from 'react-redux'

import {CHANGE_CURRENCY} from '../../actions/CurrencyExchangeActions'
import CurrencyExchangeItem from './CurrencyExchangeItem';
import Pagination from '../pagination/Pagination';

class CurrencyExchangeItemList extends React.Component
{
  constructor(props)
  {
    super(props);

    this.selectedCurrencyChangeHandler = this.selectedCurrencyChangeHandler.bind(this);
  }

  selectedCurrencyChangeHandler(index)
  {
    const sourceCurrency = this.props.currencies.get(index);
    const debit = this.props.debit;

    this.props.dispatch(CHANGE_CURRENCY(sourceCurrency, debit));
  }

  render()
  {
    const currencies = this.props.currencies;
    const debit = this.props.debit;
    const userFunds = this.props.userFunds;
    const rates = this.props.rates;
    const destinationCurrency = this.props.destinationCurrency;
    const preparedForInput = this.props.preparedForInput;
    const selectedCurrency = this.props.selectedCurrency || currencies.get(0);
    const currencyValue = this.props.currencyValue;

    return (
      <div className={this.props.className}>
        <SwipeableViews enableMouseEvents={true}
                        ignoreNativeScroll={true}
                        index={currencies.indexOf(selectedCurrency)}
                        onChangeIndex={this.selectedCurrencyChangeHandler}>
          {
            currencies.map(currency =>
              <CurrencyExchangeItem key={currency}
                                    sourceCurrency={currency}
                                    currencyValue={currencyValue}
                                    destinationCurrency={destinationCurrency}
                                    selected={selectedCurrency === currency}
                                    preparedForInput={preparedForInput}
                                    debit={debit}
                                    amount={userFunds[currency]}
                                    rates={rates}/>
            )
          }
        </SwipeableViews>
        <Pagination
          dots={currencies.size}
          index={currencies.indexOf(selectedCurrency)}
          onChangeIndex={this.selectedCurrencyChangeHandler}
        />
      </div>
    );
  }
}

export default connect()(CurrencyExchangeItemList);