export default function formatPrice(amount: number): string {
  return "$" + amount.toFixed(2);
}
