import React from "react"
import { CardComponent } from "../components/Board/Card/Card"
import { BATTLEFIELD_LINE, CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from "./cardlist"

export interface GameState {
    playerHand: Card[],
    enemyHand: Card[],
    playerDeck: Card[],
    enemyDeck: Card[],
    playerDiscard: Card[],
    enemyDiscard: Card[],
    board: Record<BATTLEFIELD_LINE, PlacedCard[]>
}

export interface BaseCard {
    type: CARD_TYPE
    title: string
    deckType: DECK_TYPE
    onCardPlayed?: (state: GameState) => GameState
    modifyPoints?: Modifier
}

export interface Modifier {
    priority: number
    effect: (self: PlacedCard, line: PlacedCard[]) => PlacedCard[]
}

export interface PlacedCard extends BaseCard {
    unitTypes: PLACED_CARD_TYPE[]
    strength: number
    apparentStrength?: number
    canBePlacedOverACard?: boolean
    authorizedLines?: BATTLEFIELD_LINE[]
}

export type Card = BaseCard | PlacedCard

export function isPlacedCard(card: Card): card is PlacedCard {
    return !!(card as PlacedCard).unitTypes && !!(card as PlacedCard).strength
}

export function cardToComponent(card: PlacedCard) {
    return (<CardComponent card={card} key={`card_${card.title}`} />)
}
