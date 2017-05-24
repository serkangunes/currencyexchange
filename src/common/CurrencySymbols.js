const currencySymbols = {
  USD: '$',
  GBP: '£',
  EUR: '€'
};

export function getSymbol(currency)
{
  return currencySymbols[currency];
}