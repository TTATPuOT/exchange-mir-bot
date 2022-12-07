import logger from '../Logger'
import { parse, HTMLElement } from 'node-html-parser'
import Rate from '../Types/Rate'

export default class Parser {
	private rates: Rate[] = []

	constructor(html: string) {
		logger.info('Begin parsing HTML...')

		this.parse(html)

		logger.info(`HTML parsed successeful, found ${this.rates.length} rates`)
	}

	private parse(html: string): void {
		const root = parse(html)

		const table = root.querySelector('table')
		if (!table) return

		this.parseTable(table)
	}

	private parseTable(table: HTMLElement): void {
		const rows = table.querySelector('tbody')?.querySelectorAll('tr')
		if (!rows) return

		for (const row of rows) {
			const cells = row.querySelectorAll('td')

			if (cells.length < 2) continue

			this.parseCells(cells)
		}
	}

	private parseCells(cells: HTMLElement[]): void {
		const name = cells[0].innerText.trim()
		const rate = parseFloat(
			cells[1].innerText
				.trim()
				.replace(/[^0-9,]/g, '')
				.replace(',', '.')
		)

		if (!name || !rate) return

		this.rates.push(new Rate(name, rate))
	}

	getResults() {
		return this.rates
	}
}
