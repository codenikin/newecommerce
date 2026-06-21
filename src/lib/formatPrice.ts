export function formatPrice(value: number, currency: string = 'INR') {
  if (typeof value !== 'number' || isNaN(value)) return ''

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}
