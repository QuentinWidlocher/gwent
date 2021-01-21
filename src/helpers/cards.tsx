import { sum } from "ramda"
import React from "react"
import { CardComponent } from "../components/Board/Card/Card"
import { BattlefieldLine } from "../types/aliases"
import { Card, PlacedCard } from "../types/card"

export function isPlacedCard(card: Card): card is PlacedCard {
    return !!(card as PlacedCard).unitTypes && !!(card as PlacedCard).originalStrength
}

export function cardToComponent(card: PlacedCard) {
    return (<CardComponent card={card} key={card.id} />)
}

export function getStrength(card: PlacedCard) {
    return (card.strength ?? card.originalStrength)
}

export function getLineStrength(line: BattlefieldLine) {
    return sum(line.map(getStrength))
}