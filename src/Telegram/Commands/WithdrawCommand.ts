import AbstractCommand from './AbstractCommand'
import Rate from '../../Types/Rate'
import logger from '../../Logger'
import { Dayjs } from 'dayjs'
import Store from '../../Data/Store'
import TelegramContext from '../../Types/TelegramContext'
import floorNumber from '../../Helpers/floorNumber'
import formatNumber from '../../Helpers/formatNumber'

const DEFAULT_CURRENT_AMOUNT = 0

export default class WithdrawCommand extends AbstractCommand {
	public static readonly command: string = 'withdraw'
	public static readonly description: string =
		'Узнать сколько в рублях будет сумма в валюте'

	private rates: Rate[] | undefined
	private date: Dayjs | undefined
	private currencyAmount: number = DEFAULT_CURRENT_AMOUNT

	public static async callback(ctx: TelegramContext): Promise<void> {
		if (!ctx.chat || !ctx.message) return
		await super.callback(ctx)

		logger.info(
			`ChatId ${ctx.chat.id} @${ctx.message.from.username} request to withdraw calculate`
		)

		const rates = await Store.getRates()
		const date = await Store.getDate()
		const currencyAmount = parseInt(ctx.command.args[0])

		const command = new WithdrawCommand(ctx)
		command
			.setRatesAndDate(rates, date)
			.setMultiplier(
				isNaN(currencyAmount) ? DEFAULT_CURRENT_AMOUNT : currencyAmount
			)
		return command.call()
	}

	public setRatesAndDate(rates: Rate[], date: Dayjs): WithdrawCommand {
		this.rates = rates
		this.date = date

		return this
	}

	public setMultiplier(multiplier: number): WithdrawCommand {
		this.currencyAmount = multiplier

		return this
	}

	public async call(): Promise<void> {
		let text: string

		if (this.currencyAmount <= 0) {
			text = `Пожалуйста, укажите вместе с командой, сколько валюты вы хотите снять. Например: <code>/${WithdrawCommand.command} 1000</code>`
		} else {
			text = this.getText()
		}

		await this.ctx.reply(text, { parse_mode: 'HTML' })
	}

	protected getText(): string {
		if (!this.rates) throw new Error(`Not found rates`)

		let text = this.getHeaderText()

		for (const rate of this.rates) {
			text += this.getCalculatedText(rate)
		}

		text += this.getFooterText()

		return text
	}

	protected getHeaderText(): string {
		const dateText = this.getDate()

		let text = `Курс снятия с карт МИР рассчитан на основе данных от <b>${dateText}</b>\n\n`
		text += `Вы запросили расчёт для <b>${formatNumber(
			this.currencyAmount
		)} у.е.</b>\n\n`

		return text
	}

	protected getCalculatedText(rate: Rate): string {
		const currencyPrice = floorNumber(
			this.currencyAmount / (1 / rate.getRate())
		)

		return `${rate.getFlag()} ${rate.getName()}: <b>${currencyPrice}</b> ₽\n`
	}

	protected getFooterText(): string {
		let text = ''

		if (process.env.BOT_USERNAME) text += `\n${process.env.BOT_USERNAME}`

		return text
	}

	protected getDate(): string {
		if (!this.date) throw new Error(`Not found date`)

		return this.date.format('DD.MM.YYYY hh:mm')
	}
}
