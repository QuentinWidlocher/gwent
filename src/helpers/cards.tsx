import React from "react"
import { CardComponent } from "../components/Board/Card/Card"
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, ENEMY_LINES, PLAYER_LINES } from "../constants/constants"
import { Card, PlacedCard } from "../types/card"
import { notNil } from "./helpers"

export function isPlacedCard(card: Card): card is PlacedCard {
    return !!(card as PlacedCard).unitTypes && !!(card as PlacedCard).originalStrength
}

export function cardToComponent(card: PlacedCard) {
    return (<CardComponent card={card} key={card.id} />)
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
                let authorizedLines = playerTurn ? PLAYER_LINES : ENEMY_LINES
                return authorizedLines.includes(line)
            })
    }
}