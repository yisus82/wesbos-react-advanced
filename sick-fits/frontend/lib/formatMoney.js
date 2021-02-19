const formatMoney = (amount = 0) => {
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  };

  const defaultLocale = new Intl.NumberFormat().resolvedOptions().locale;

  const formatter = Intl.NumberFormat(defaultLocale, options);

  return formatter.format(amount / 100);
};

export default formatMoney;
