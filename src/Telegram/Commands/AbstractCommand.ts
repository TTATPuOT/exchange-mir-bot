import TelegramContext from '../../Types/TelegramContext'

export default abstract class AbstractCommand {
	public static readonly command: string = ''
	public static readonly description: string = ''
	public static readonly showInList: boolean = true

	protected ctx: TelegramContext

	public static async callback(ctx: TelegramContext): Promise<void> {
		await ctx.sendChatAction('typing')
	}

	constructor(ctx: TelegramContext) {
		this.ctx = ctx
	}

	public async call(): Promise<void> {
		throw new Error('Please, implements AbstractCommand')
	}
}
