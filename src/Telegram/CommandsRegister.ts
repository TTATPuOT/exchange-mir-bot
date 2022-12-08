import { Telegraf } from 'telegraf'
import StartCommand from './Commands/StartCommand'
import AbstractCommand from './Commands/AbstractCommand'
import RatesCommand from './Commands/RatesCommand'
import HelpCommand from './Commands/HelpCommand'
import { BotCommand } from 'telegraf/src/core/types/typegram'
import logger from '../Logger'

export default class CommandsRegister {
	private static readonly commands: AbstractCommand[] = [
		new StartCommand(),
		new RatesCommand(),
		new HelpCommand(),
	]

	public static register(bot: Telegraf) {
		const commands: BotCommand[] = []

		for (const command of CommandsRegister.commands) {
			//.bind используется потому что контекст почему-то сбивается в дебрях telegraf'а
			bot.command(command.name, command.callback.bind(command))

			if (command.showInList) {
				commands.push({
					command: `/${command.name}`,
					description: command.description,
				})
			}
		}

		logger.info('Registering commands')
		bot.telegram.setMyCommands(commands).then(() => {
			logger.info('Commands successeful registered')
		})
	}
}
