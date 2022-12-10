import TelegramContext from '../../Types/TelegramContext'

const CommandArgs = () => (ctx: TelegramContext, next: () => Promise<void>) => {
	//@ts-ignore
	if (ctx.updateType === 'message' && ctx.update?.message?.text) {
		//@ts-ignore
		const raw = ctx.update.message.text.toLowerCase() as string

		if (raw.startsWith('/')) {
			const match = raw.match(/^\/([^\s]+)\s?(.+)?/)

			const args: string[] = []
			let command = ''
			if (match) {
				if (match[1]) command = match[1]
				if (match[2]) args.push(...match[2].split(' '))
			}

			ctx.command = {
				raw,
				command,
				args,
			}
		}
	}

	return next()
}

export default CommandArgs
