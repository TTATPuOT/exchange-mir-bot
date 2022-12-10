import Rate from '../Types/Rate'
import dayjs, { Dayjs } from 'dayjs'
import Downloader from './Downloader'
import Parser from './Parser'
import logger from '../Logger'

export default class Store {
	static rates: Rate[] | null = null
	static date: Dayjs | null = null

	static async getRates(): Promise<Rate[]> {
		if (!this.rates) await Store.updateRates()

		//@ts-ignore
		return this.rates
	}

	static async getDate(): Promise<Dayjs> {
		if (!this.date) await Store.updateRates()

		//@ts-ignore
		return this.date
	}

	private static async updateRates(): Promise<void> {
		logger.info(`Rates will be updated`)

		const html = await Downloader.getHtml()
		const parser = new Parser(html)

		this.rates = parser.getResults()
		this.date = dayjs(new Date())
	}
}
