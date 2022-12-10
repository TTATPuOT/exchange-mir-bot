const formatNumber = (number: number): string => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		currencyDisplay: 'code',
	})
		.format(number)
		.replace('RUB', '')
		.trim()
}

export default formatNumber
