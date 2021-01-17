import React from "react"
import { Card, cardToComponent } from "../../../models/card"
import styles from "./PlayerHand.module.css"

export interface PlayerHandProps {
    cards: Card[]
}

export function PlayerHandComponent(props: PlayerHandProps) {
    return (
        <div className={styles.playerHand}>
            {props.cards.map(cardToComponent)}
        </div>
    )
}