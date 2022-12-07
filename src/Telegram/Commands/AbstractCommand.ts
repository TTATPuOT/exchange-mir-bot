import { Context } from 'telegraf'

export default abstract class AbstractCommand {
	public readonly name: string = ''

	public async callback(ctx: Context): Promise<void> {
		throw new Error('Please, implements AbstractCommands')
	}
}
