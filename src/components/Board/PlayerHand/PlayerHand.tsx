import React, { useState } from "react"
import { Card } from "../../../models/card"
import { CardComponent } from "../Card/Card"
import styles from "./PlayerHand.module.css"

export interface PlayerHandProps {
    cards: Card[]
    selectedCard: Card | null,
    onCardSelect?: (card: Card) => void
}

export function PlayerHandComponent(props: PlayerHandProps) {

    function onCardSelect(index: number) {
        const selectedCard = props.cards[index] ?? null
        if (!!props.onCardSelect && !!selectedCard) {
            props.onCardSelect(selectedCard)
        }
    }

    return (
        <div className={styles.playerHand}>
            {props.cards.map((card, index) => (
                <CardComponent
                    card={card}
                    canBeSelected={true}
                    selected={props.cards.findIndex(card => card.title == props.selectedCard?.title) == index}
                    onClick={() => onCardSelect(index)}
                />
            ))}
        </div>
    )
}