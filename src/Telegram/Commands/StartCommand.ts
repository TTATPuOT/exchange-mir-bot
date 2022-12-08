import AbstractCommand from './AbstractCommand'
import { Context } from 'telegraf'

export default class StartCommand extends AbstractCommand {
	public readonly name: string = 'start'
	public readonly showInList: boolean = false

	async callback(ctx: Context): Promise<void> {
		let text = 'Привет! 🤩\n'
		text +=
			'🦄 Этот бот позволяет очень удобно узнать актуальный курс валют карт МИР.\n\n'
		text +=
			'🧙 Это нужно для оплаты или снятия в банкоматах Российских банков за рубежом.'
		text +=
			'Большая часть банков использует именно этот курс, но бывают и исключения.\n\n'
		text += '💎 <b>Узнать текущий крус можно командой /rates</b>'

		await ctx.reply(text, { parse_mode: 'HTML' })
	}
}
