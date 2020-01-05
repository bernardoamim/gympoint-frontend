export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
});

export function capitalizeMonth(str) {
  const parsedStr = str.split(' de ');
  parsedStr[1] =
    parsedStr[1].charAt(0).toUpperCase() + parsedStr[1].substring(1);

  return parsedStr.join(' de ');
}
