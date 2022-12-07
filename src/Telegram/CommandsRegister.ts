import { Telegraf } from 'telegraf'
import StartCommand from './Commands/StartCommand'
import AbstractCommand from './Commands/AbstractCommand'
import RatesCommand from './Commands/RatesCommand'

export default class CommandsRegister {
	private static readonly commands: AbstractCommand[] = [
		new StartCommand(),
		new RatesCommand(),
	]

	public static register(bot: Telegraf) {
		for (const command of CommandsRegister.commands) {
			//.bind используется потому что контекст почему-то сбивается в дебрях telegraf'а
			bot.command(command.name, command.callback.bind(command))
		}
	}
}
