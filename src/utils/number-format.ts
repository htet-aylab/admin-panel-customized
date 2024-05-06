export const numberFormat = (number: any, decimal = 2) => {
  if (isNaN(number) || number === '') return '';
  const numericValue = parseFloat(number);
  if (isNaN(numericValue)) return '';
  if (!isNaN(decimal) && decimal >= 0) {
    return numericValue.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};