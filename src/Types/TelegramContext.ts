import { Context } from 'telegraf'

export default interface TelegramContext extends Context {
	command: {
		raw: string
		command: string
		args: string[]
	}
}
