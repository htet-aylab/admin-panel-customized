export const numberFormat = (number : number, decimal = 2) => {
  return number
    .toFixed(decimal)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
