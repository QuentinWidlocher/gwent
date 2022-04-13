import { Card } from '../types/card'

export function removeCardFromHand(card: Card, hand: Card[]): Card[] {
	const mutatedHand = [...hand]
	mutatedHand.splice(
		hand.findIndex(c => c.id == card.id),
		1
	)
	return mutatedHand
}
