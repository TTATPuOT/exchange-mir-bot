import AbstractCommand from './AbstractCommand'
import Downloader from '../../Data/Downloader'
import TelegramContext from '../../Types/TelegramContext'

export default class HelpCommand extends AbstractCommand {
	public static readonly command: string = 'help'
	public static readonly description: string = 'Информация о боте'

	public static async callback(ctx: TelegramContext): Promise<void> {
		let text = 'Бот разработан @neverov12 ✨\n'
		text +=
			'Если что-то не работает, пишите мне. Бот может задерживать отправку сообщений <b>до 30 секунд</b> из за бесплатного размещения на хостинге 🦥\n\n'
		text += `Информация о курсах берётся с <a href="${Downloader.url}">официального сайта ПС «Мир»</a>\n\n`
		text += `Создатель и бот никак не связаны с АО «НСПК» или ПС «Мир», вся информация предоставленная в боте несёт ознакомительный характер. Не является индивидуальной инвестиционной рекомендацией.`

		await ctx.reply(text, { parse_mode: 'HTML' })
	}
}
