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
        if (notNil(selectedCard)) {
            props.onCardSelect(selectedCard)
        }
    }

    return (
        <div className={styles.playerHand}>
            {props.cards.map((card, index) => (
                <CardComponent
                    card={card}
                    canBeSelected={props.canSelectCards}
                    selected={props.cards.findIndex(card => card.id == props.selectedCard?.id) == index}
                    onClick={() => onCardSelect(index)}
                    key={card.id}
                />
            ))}
        </div>
    )
}