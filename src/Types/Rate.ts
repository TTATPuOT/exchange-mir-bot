const FLAGS: { [key: string]: string } = {
	'Армянский драм': '🇦🇲',
	'Белорусский рубль': '🇧🇾',
	'Вьетнамский донг': '🇻🇳',
	'Казахстанский тенге': '🇰🇿',
	'Кыргызский сом': '🇰🇬',
	'Таджикский сомони': '🇹🇯',
	'Узбекский сум': '🇺🇿',
}

const CURRENCIES: { [key: string]: string } = {
	'Армянский драм': '֏',
	'Белорусский рубль': 'Br',
	'Вьетнамский донг': '₫',
	'Казахстанский тенге': '₸',
	'Кыргызский сом': 'с',
	'Таджикский сомони': 'смн',
	'Узбекский сум': 'сўм',
}

export default class Rate {
	private readonly name: string
	private readonly rate: number
	private readonly invertedRate: number

	constructor(name: string, rate: number) {
		this.name = name
		this.rate = rate
		this.invertedRate = 1 / this.rate
	}

	getFlag(): string {
		if (!FLAGS[this.name]) return ''
		return FLAGS[this.name]
	}

	getCurrency(): string {
		if (!CURRENCIES[this.name]) return ''
		return CURRENCIES[this.name]
	}

	getName(): string {
		return this.name
	}

	getRate(): number {
		return this.rate
	}

	getInvertedRate(): number {
		return Math.ceil(this.invertedRate * 100) / 100
	}
}
