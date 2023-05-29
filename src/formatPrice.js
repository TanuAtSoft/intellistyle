/**
 * 
 * @param {string} currencySymbol The symbol of the currency e.g. '$'
 * @param {number} price The price that you want to format
 * @param {boolean} commas Whether you want to add commas
 * @param {number} decimalPlaces The number of decimal places to show
 * @returns 
 */
const currencySymbols = {
    CNY: '¥',
    EUR: '€',
    GBP: '£',
    HKD: 'HK$',
    TRY: '₺',
    USD: '$',
    CHF: 'CHF',
    AED: 'AED ',
    BHD: 'BHD ',
    KWD: 'KWD ',
    OMR: 'OMR ',
    QAR: 'QAR ',
    SAR: 'SAR ',
    RON: 'Lei'
}
export default function formatPrice(currencyCode, price, commas, decimalPlaces, displaySymbolAfterPrice, convertCurrencySymbol = true) {
    if (!price) {price = 0.0}
    let priceFormatted = price.toFixed(decimalPlaces)
    if (commas) {
        priceFormatted = priceFormatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let symbol = ''
    if (convertCurrencySymbol) {
        symbol = currencySymbols[currencyCode] || symbol
    } else {
        symbol = currencyCode + ' '
    }
    
    return displaySymbolAfterPrice ? `${priceFormatted} ${symbol}` : `${symbol}${priceFormatted}`
}
