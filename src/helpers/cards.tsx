import React from 'react'
import { CardComponent } from '../components/Board/Card/Card'
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, CARD_TYPE, ENEMY_LINES, PLAYER_LINES } from '../constants/constants'
import { Card, PlacedCard } from '../types/card'
import { notNil } from './helpers'

export function canBePlaced(card: Card): card is PlacedCard {
	return cardIsModifier(card) || cardIsPlaced(card)
}

export function cardIsModifier(card: Card): card is PlacedCard {
	return card.type == CARD_TYPE.MODIFIER
        && notNil((card as PlacedCard).unitTypes)
        && notNil((card as PlacedCard).originalStrength)
}

export function cardIsPlaced(card: Card): card is PlacedCard {
	return card.type == CARD_TYPE.PLACED
        && notNil((card as PlacedCard).unitTypes)
        && notNil((card as PlacedCard).originalStrength)
}

export function cardToComponent(card: PlacedCard, index: number) {
	return (<CardComponent card={card} key={`${card.id}-#${index}`} />)
}

export function getStrength(card: PlacedCard) {
	return (card.strength ?? card.originalStrength)
}

// Allow highlighting rows with the same rules as placing card
// TODO: REALLY use the same rules instead of duplicating
export function getAuthorizedLines(card: PlacedCard, playerTurn: boolean): BATTLEFIELD_LINE[] {
	if (notNil(card.authorizedLines)) {
		return card.authorizedLines
	} else {
		return card.unitTypes
			.flatMap(type => CARD_AUTHORIZED_LINES[type])
			.filter(line => {
				const authorizedLines = playerTurn ? PLAYER_LINES : ENEMY_LINES
				return authorizedLines.includes(line)
			})
	}
}

export function notHero(card: Card): card is PlacedCard {
	return cardIsPlaced(card) && !card.isHero
}

export function isHero(card: Card): boolean {
	return !notHero(card)
}