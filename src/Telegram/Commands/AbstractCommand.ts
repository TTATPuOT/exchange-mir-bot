import { Context } from 'telegraf'

export default abstract class AbstractCommand {
	public readonly name: string = ''
	public readonly description: string = ''
	public readonly showInList: boolean = true

	public async callback(ctx: Context): Promise<void> {
		throw new Error('Please, implements AbstractCommands')
	}
}
