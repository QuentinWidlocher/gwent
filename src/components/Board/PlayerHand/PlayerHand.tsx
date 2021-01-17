import React, { useState } from "react"
import { Card } from "../../../models/card"
import { CardComponent } from "../Card/Card"
import styles from "./PlayerHand.module.css"

export interface PlayerHandProps {
    cards: Card[]
    onCardSelect?: (card: Card) => void
}

export function PlayerHandComponent(props: PlayerHandProps) {

    const [selection, setSelection] = useState<number>(-1)

    function onCardSelect(index: number) {
        setSelection(index)
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
                    selected={selection == index}
                    onClick={() => onCardSelect(index)}
                />
            ))}
        </div>
    )
}