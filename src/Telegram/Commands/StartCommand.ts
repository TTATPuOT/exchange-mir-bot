import AbstractCommand from './AbstractCommand'
import TelegramContext from '../../Types/TelegramContext'

export default class StartCommand extends AbstractCommand {
	public static readonly command: string = 'start'
	public static readonly showInList: boolean = false

	public static async callback(ctx: TelegramContext): Promise<void> {
		console.log(ctx.command)

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
