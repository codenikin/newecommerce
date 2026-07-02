export function formatPrice(value: number, currency: string = 'INR') {
    if (typeof value !== 'number' || isNaN(value)) return ''

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(value)
}

export function formatPriceWithExtra(priceInPaise: number | null | undefined): string {
    if (priceInPaise === null || priceInPaise === undefined || isNaN(priceInPaise)) {
        return '₹0.00';
    }

    // Convert integer to decimal (e.g., 10000 -> 100)
    const priceInDecimal = priceInPaise / 100;

    // Format as INR currency
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(priceInDecimal);
}
