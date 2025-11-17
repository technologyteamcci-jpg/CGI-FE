export const formatMoney = function (value: number) {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Input must be a valid number");
  }
  const absValue = Math.abs(value);
  let formattedValue;

  if (absValue >= 1_000_000_000) {
    formattedValue = `${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    formattedValue = `${(value / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    formattedValue = `${(value / 1_000).toFixed(2)}K`;
  } else {
    formattedValue = `${value.toFixed(2)}`; // Keep cents if value is less than 1k
  }

  return `$${formattedValue}`;
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
