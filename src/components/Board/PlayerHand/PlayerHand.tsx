import React from "react"
import { notNil } from "../../../helpers/helpers"
import { Card } from "../../../types/card"
import { CardComponent } from "../Card/Card"
import styles from "./PlayerHand.module.css"

export type PlayerHandProps = {
    cards: Card[]
    selectedCard: Card | null,
    onCardSelect: (card: Card) => void
    canSelectCards: boolean
}

export function PlayerHandComponent(props: PlayerHandProps) {

    function onCardSelect(index: number) {
        const selectedCard = props.cards[index] ?? null
        if (notNil(selectedCard) && props.canSelectCards) {
            props.onCardSelect(selectedCard)
        }
    }

    function findCardIndex(cardToFind: Card | null): number {
        if (notNil(cardToFind)) {
            return props.cards.findIndex(card => cardToFind.id == card.id)
        } else {
            return -1
        }
    }

    return (
        <div className={styles.playerHand}>
            {props.cards.map((card, index) => (
                <CardComponent
                    card={card}
                    canBeSelected={props.canSelectCards}
                    selected={findCardIndex(props.selectedCard) == index}
                    onClick={() => onCardSelect(index)}
                    key={card.id}
                />
            ))}
        </div>
    )
}