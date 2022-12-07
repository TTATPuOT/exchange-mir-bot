export default class Rate {
	private readonly name: string
	private readonly rate: number
	private readonly invertedRate: number

	constructor(name: string, rate: number) {
		this.name = name
		this.rate = rate
		this.invertedRate = 1 / this.rate
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
