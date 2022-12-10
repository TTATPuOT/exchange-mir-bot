import * as dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import CommandsRegister from './src/Telegram/CommandsRegister'
import logger from './src/Logger'
import TelegramContext from './src/Types/TelegramContext'
import CommandArgs from './src/Telegram/Middlewares/CommandArgs'

dotenv.config()

logger.info(`Bot starting on ${process.env.DOMAIN}:${process.env.PORT}`)
const bot = new Telegraf<TelegramContext>(process.env.BOT_TOKEN as string)

bot.use(CommandArgs())
CommandsRegister.register(bot)

bot.launch({
	webhook: {
		domain: process.env.DOMAIN as string,
		port: (process.env.PORT || 3000) as number,
	},
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
