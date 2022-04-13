import { CARD_LIST } from '../constants/card-list'
import { Card } from '../types/card'

export function findCards(cardsName: string[]): Card[] {
	return cardsName
		.map(name => CARD_LIST.find(card => fuzzyMatch(card.title, name)))
		.map((card, i) => ({
			...card,
			id: `${card?.title.replaceAll(' ', '_')}_${i}`,
		})) as Card[]
}

function fuzzyMatch(str: string, pattern: string): boolean {
	pattern = pattern
		.toLocaleLowerCase()
		.split('')
		.reduce(function (a, b) {
			return a + '.*' + b
		})
	return new RegExp(pattern).test(str.toLocaleLowerCase())
}
