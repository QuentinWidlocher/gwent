import React from "react"
import { CardComponent } from "../components/Board/Card/Card"
import { CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from "./cardlist"
import { BATTLEFIELD_LINE } from "./constants"
export interface BaseCard {
    type: CARD_TYPE,
    title: string,
    deckType: DECK_TYPE,
    onCardPlayed?: () => void
}

export interface PlacedCard extends BaseCard {
    unitTypes: PLACED_CARD_TYPE[],
    strength: number,
    canBePlacedOverACard?: boolean,
    authorizedLines?: BATTLEFIELD_LINE[],
}

export type Card = BaseCard | PlacedCard

export function isPlacedCard(card: Card): card is PlacedCard {
    return !!(card as PlacedCard).unitTypes && !!(card as PlacedCard).strength
}

export function cardToComponent(card: PlacedCard) {
    return (<CardComponent card={card} key={`card_${card.title}`} />)
}
