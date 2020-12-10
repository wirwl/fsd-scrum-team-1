const CURRENCIES = {
  DOLLAR: 74.78,
  EURO: 90.32,
};

function applyActualCurrencyToValue(value: number, language: string):number {
  let convertedValue = value;

  if (language === 'en') convertedValue = value / CURRENCIES.DOLLAR;
  if (language === 'de' || language === 'es') convertedValue = value / CURRENCIES.EURO;

  return Math.round(convertedValue);
}

export default applyActualCurrencyToValue;
