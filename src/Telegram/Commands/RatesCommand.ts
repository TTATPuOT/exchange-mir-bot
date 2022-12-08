import AbstractCommand from './AbstractCommand'
import { Context } from 'telegraf'
import Rate from '../../Types/Rate'
import Downloader from '../../Data/Downloader'
import Parser from '../../Data/Parser'
import logger from '../../Logger'
import dayjs, { Dayjs } from 'dayjs'

export default class RatesCommand extends AbstractCommand {
	public readonly name: string = 'rates'
	public readonly description: string = 'Получить актуальные курсы валют'

	private rates: Rate[] = []
	private date: Dayjs

	constructor() {
		super()

		this.date = dayjs(new Date())
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

		await ctx.reply(this.getText(), { parse_mode: 'HTML' })
	}

	private async updateRates(): Promise<void> {
		const html = await Downloader.getHtml()
		const parser = new Parser(html)

		this.rates = parser.getResults()
		this.date = dayjs(new Date())
	}

	private getText(): string {
		let text = `Курсы снятия и оплаты валют с карт МИР на <b>${this.getDate()}</b>\n\n`

		for (const rate of this.rates) {
			text += `${rate.getFlag()} ${rate.getName()}: <b>${rate.getInvertedRate()}</b> ₽ (${rate.getRate()} ${rate.getCurrency()})\n`
		}

		text +=
			'\nКурсы других валют устанавливаются банками, выпустившими карту, а не ПС «Мир»\n'

		if (process.env.BOT_USERNAME) {
			text += `\n${process.env.BOT_USERNAME}`
		}

		return text
	}

	private getDate(): string {
		return this.date.format('DD.MM.YYYY hh:mm')
	}
}
