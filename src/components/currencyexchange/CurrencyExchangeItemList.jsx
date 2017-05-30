import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import CurrencyExchangeItemContainer from './CurrencyExchangeItemContainer';
import Pagination from '../pagination/Pagination';

class CurrencyExchangeItemList extends React.Component
{
  render()
  {
    const currencies = this.props.currencies;
    const debit = this.props.debit;
    const selectedCurrency = this.props.selectedCurrency;

    return (
      <div className={this.props.className}>
        <SwipeableViews enableMouseEvents={true}
                        ignoreNativeScroll={true}
                        index={currencies.indexOf(selectedCurrency)}
                        onChangeIndex={this.props.selectedCurrencyChangeHandler}>
          {
            currencies.map(currency =>
              <CurrencyExchangeItemContainer key={currency}
                                             sourceCurrency={currency}
                                             debit={debit}/>
            )
          }
        </SwipeableViews>
        <Pagination
          dots={currencies.size}
          index={currencies.indexOf(selectedCurrency)}
          onChangeIndex={this.props.selectedCurrencyChangeHandler}
        />
      </div>
    );
  }
}

export default CurrencyExchangeItemList;