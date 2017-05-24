import Ajax from 'ajax-promise-es6'

const CurrencyExchangeActionTypes = {
  CHANGE_CURRENCY           : 'changeCurrency',
  PREPARE_FOR_CURRENCY_INPUT: 'prepareForCurrencyInput',
  CURRENCY_INPUT            : 'currencyInput',
  CANCEL_CURRENCY_INPUT     : 'cancelCurrencyInput',
  UPDATE_RATES              : 'updateRates',
  COMPLETE_EXCHANGE         : 'completeExchange'
};


export {CurrencyExchangeActionTypes};

export function CHANGE_CURRENCY(currency, isDebit)
{
  return {
    type: CurrencyExchangeActionTypes.CHANGE_CURRENCY,
    currency,
    isDebit
  }
}

export function PREPARE_FOR_CURRENCY_INPUT(isDebit)
{
  return {
    type: CurrencyExchangeActionTypes.PREPARE_FOR_CURRENCY_INPUT,
    isDebit
  }
}

export function CURRENCY_INPUT(value, isDebit)
{
  return {
    type: CurrencyExchangeActionTypes.CURRENCY_INPUT,
    value,
    isDebit
  }
}

export function COMPLETE_EXCHANGE()
{
  return {
    type: CurrencyExchangeActionTypes.COMPLETE_EXCHANGE
  }
}

export function CANCEL_CURRENCY_INPUT(isDebit)
{
  return {
    type: CurrencyExchangeActionTypes.CANCEL_CURRENCY_INPUT,
    isDebit
  }
}

export function UPDATE_RATES(rates)
{
  return {
    type: CurrencyExchangeActionTypes.UPDATE_RATES,
    rates
  }
}

export function fetchRates(supportedCurrencies)
{
  return function (dispatch)
  {
    Ajax.get('https://openexchangerates.org/api/latest.json?app_id=0114e4b9ccda42a28905304e3a9042dd').then(response =>
    {
      const exchange = JSON.parse(response);

      const baseCurrency = 'USD';
      const rates = {};

      for (let i = 0; i < supportedCurrencies.size; i++)
      {
        let currency = supportedCurrencies.get(i);

        if (currency === baseCurrency)
        {
          continue;
        }

        rates[baseCurrency + currency] = exchange.rates[currency];
      }

      rates['GBPEUR'] = Math.round((1 / rates['USDGBP']) * rates['USDEUR'] * 1000000) / 1000000;

      dispatch(UPDATE_RATES(rates));
    });
  }
}

