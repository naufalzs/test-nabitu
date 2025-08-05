export default function formatToCurrency(value: number) {
  const formatter = new Intl.NumberFormat("de-De");
  return formatter.format(value);
}
