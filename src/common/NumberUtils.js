import {getSymbol} from './CurrencySymbols'

//Very simplified format function
export function formatNumber(value, numberOfDecimals = 2)
{
  const formatter = Math.pow(10, numberOfDecimals);
  value = Math.round(value * formatter) / formatter;

  let stringValue = String(value);
  const stringValueSplit = stringValue.split('.');

  if (stringValueSplit.length === 2)
  {
    //Already has decimals
    let decimalPart = stringValueSplit[1];
    if (decimalPart.length < 2)
    {
      stringValue += '0';
    }
  }
  else
  {
    stringValue += '.00';
  }

  return stringValue;
}

export function formatCurrency(currency, value, numberOfDecimals = 2)
{
  const formatter = Math.pow(10, numberOfDecimals);
  value = Math.round(value * formatter) / formatter;

  let stringValue = String(value);
  const stringValueSplit = stringValue.split('.');
  let length;

  if (stringValueSplit.length === 2)
  {
    //Already has decimals
    let decimalPart = stringValueSplit[1];
    if (decimalPart.length < numberOfDecimals)
    {
      length = numberOfDecimals - decimalPart.length;
    }
  }
  else
  {
    stringValue += '.';
    length = numberOfDecimals;
  }

  for (let i = 0; i < length; i++)
  {
    stringValue += '0';
  }

  return getSymbol(currency) + stringValue;
}

export function getRate(sourceCurrency, destinationCurrency, rates)
{
  return rates[sourceCurrency + destinationCurrency] || 1 / rates[destinationCurrency + sourceCurrency];
}