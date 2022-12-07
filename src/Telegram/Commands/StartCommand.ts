import AbstractCommand from './AbstractCommand'
import { Context } from 'telegraf'

export default class StartCommand extends AbstractCommand {
	public readonly name: string = 'start'

	async callback(ctx: Context): Promise<void> {
		await ctx.reply('Hello')
	}
}
