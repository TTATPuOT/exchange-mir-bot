import AbstractCommand from './AbstractCommand'
import Rate from '../../Types/Rate'
import logger from '../../Logger'
import { Dayjs } from 'dayjs'
import Store from '../../Data/Store'
import TelegramContext from '../../Types/TelegramContext'
import floorNumber from '../../Helpers/floorNumber'
import formatNumber from '../../Helpers/formatNumber'

const DEFAULT_MULTIPLIER = 0

export default class RatesCommand extends AbstractCommand {
	public static readonly command: string = 'rates'
	public static readonly description: string =
		'Получить актуальные курсы валют'

	private rates: Rate[] | undefined
	private date: Dayjs | undefined
	private multiplier: number = DEFAULT_MULTIPLIER

	public static async callback(ctx: TelegramContext): Promise<void> {
		if (!ctx.chat || !ctx.message) return
		await super.callback(ctx)

		logger.info(
			`ChatId ${ctx.chat.id} @${ctx.message.from.username} request to rates`
		)

		const rates = await Store.getRates()
		const date = await Store.getDate()
		const multiplier = parseInt(ctx.command.args[0])

		const command = new RatesCommand(ctx)
		command
			.setRatesAndDate(rates, date)
			.setMultiplier(isNaN(multiplier) ? DEFAULT_MULTIPLIER : multiplier)
		return command.call()
	}

	public setRatesAndDate(rates: Rate[], date: Dayjs): RatesCommand {
		this.rates = rates
		this.date = date

		return this
	}

	public setMultiplier(multiplier: number): RatesCommand {
		this.multiplier = multiplier

		return this
	}

	private isNeedCalculate(): boolean {
		return this.multiplier > DEFAULT_MULTIPLIER
	}

	public async call(): Promise<void> {
		const text = this.getText()

		await this.ctx.reply(text, { parse_mode: 'HTML' })
	}

	protected getText(): string {
		if (!this.rates) throw new Error(`Not found rates`)

		let text = this.getHeaderText()

		for (const rate of this.rates) {
			text += this.isNeedCalculate()
				? this.getCalculatedText(rate)
				: this.getRateText(rate)
		}

		text += this.getFooterText()

		return text
	}

	protected getHeaderText(): string {
		const dateText = this.getDate()

		let text = `Курсы снятия и оплаты валют с карт МИР на <b>${dateText}</b>\n\n`
		if (this.isNeedCalculate()) {
			text += `Вы запросили расчёт для <b>${formatNumber(
				this.multiplier
			)}</b> ₽\n\n`
		}

		return text
	}

	private getRateText(rate: Rate): string {
		return `${rate.getFlag()} ${rate.getName()}: <b>${rate.getInvertedRate()}</b> ₽ (${rate.getRate()} ${rate.getCurrency()})\n`
	}

	protected getCalculatedText(rate: Rate): string {
		const currencyPrice = floorNumber(this.multiplier / rate.getRate())

		return `${rate.getFlag()} ${rate.getName()}: <b>${currencyPrice}</b> ${rate.getCurrency()}\n`
	}

	protected getFooterText(): string {
		let text = ''

		if (!this.isNeedCalculate()) {
			text += `\nВы так же можете добавить к команде /${RatesCommand.command} число, чтобы рассчитать сумму рублей в местной валюте.\n`
			text += `Например: <code>/${RatesCommand.command} 1000</code>\n`
		}

		if (process.env.BOT_USERNAME) text += `\n${process.env.BOT_USERNAME}`

		return text
	}

	protected getDate(): string {
		if (!this.date) throw new Error(`Not found date`)

		return this.date.format('DD.MM.YYYY hh:mm')
	}
}
