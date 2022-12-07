import axios from 'axios'
import logger from '../Logger'

export default class Downloader {
	private static readonly url: string =
		'https://mironline.ru/support/list/kursy_mir/'

	public static async getHtml(): Promise<string> {
		logger.info('Downloading HTML from MIR site...')

		const request = await axios.get(Downloader.url)

		logger.info('HTML downloaded successeful')
		return request.data
	}
}
