import React from "react"
import { CardComponent } from "../components/Board/Card/Card"
import { CARD_TYPE, DECK_TYPE } from "./cardlist"
export interface Card {
    title: string,
    strength: number,
    types: CARD_TYPE[],
    deckType: DECK_TYPE
}

export function cardToComponent(card: Card) {
    return (<CardComponent card={card} />)
}
