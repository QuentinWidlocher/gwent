import React from "react"
import { CardComponent } from "../components/Board/Card/Card"
import { CARD_TYPE } from "./constants"
export interface Card {
    title: string,
    strength: number,
    type: CARD_TYPE
}

export function cardToComponent(card: Card) {
    return (<CardComponent card={card} />)
}
