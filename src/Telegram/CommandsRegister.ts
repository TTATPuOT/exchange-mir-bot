import { Telegraf } from 'telegraf'
import StartCommand from './Commands/StartCommand'
import AbstractCommand from './Commands/AbstractCommand'
import RatesCommand from './Commands/RatesCommand'
import HelpCommand from './Commands/HelpCommand'
import { BotCommand } from 'telegraf/src/core/types/typegram'
import logger from '../Logger'
import TelegramContext from '../Types/TelegramContext'
import WithdrawCommand from './Commands/WithdrawCommand'

export default class CommandsRegister {
	private static readonly commands: typeof AbstractCommand[] = [
		StartCommand,
		RatesCommand,
		HelpCommand,
		WithdrawCommand,
	]

	public static register(bot: Telegraf<TelegramContext>) {
		const commands: BotCommand[] = []

		for (const command of CommandsRegister.commands) {
			//.bind используется потому что контекст почему-то сбивается в дебрях telegraf'а
			bot.command(command.command, command.callback.bind(command))

			if (command.showInList) {
				commands.push({
					command: `/${command.command}`,
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
