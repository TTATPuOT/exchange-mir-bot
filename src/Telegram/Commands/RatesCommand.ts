import AbstractCommand from './AbstractCommand'
import { Context } from 'telegraf'
import Rate from '../../Types/Rate'
import Downloader from '../../Data/Downloader'
import Parser from '../../Data/Parser'
import logger from '../../Logger'

export default class RatesCommand extends AbstractCommand {
	public readonly name: string = 'rates'

	private rates: Rate[] = []
	private date: Date

	constructor() {
		super()

		this.date = new Date()
	}

	async callback(ctx: Context): Promise<void> {
		if (!ctx.chat || !ctx.message) return

		logger.info(
			`ChatId ${ctx.chat.id} @${ctx.message.from.username} request to rates`
		)

		if (this.rates.length <= 0) {
			logger.info(`Rates will be updated`)
			await ctx.sendChatAction('typing')
			await this.updateRates()
		}

		await ctx.reply(this.getText())
	}

	private async updateRates(): Promise<void> {
		const html = await Downloader.getHtml()
		const parser = new Parser(html)

		this.rates = parser.getResults()
		this.date = new Date()
	}

	private getText(): string {
		let text = 'Курсы валют на ' + this.date.toString() + ':\n\n' //TODO: Сделать красиво

		for (const rate of this.rates) {
			text += `${rate.getName()}: ${rate.getInvertedRate()} (${rate.getRate()})\n` //TODO: Сделать красиво
		}

		return text
	}
}
