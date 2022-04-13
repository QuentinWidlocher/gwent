import { CARD_LIST } from '../constants/card-list'
import { DECK_TYPE } from '../constants/constants'
import { Card } from '../types/card'

export function getActualDeck(deckType: DECK_TYPE): Card[] {
	return CARD_LIST.filter((card) => card.deckType == deckType) // Only cards from the deck
		.flatMap((card) =>
			[...Array(card.occurence)].map((_, i) => ({
				...card,
				id: `${card.title.replaceAll(' ', '_')}_${i}`,
			}))
		) // One for each occurence
}
