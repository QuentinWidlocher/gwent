import React, { FC } from "react"
import { Card } from "../../../types/card"
import { Round } from "../Board"
import { CardComponent } from "../Card/Card"
import styles from "./Deck.module.css"

export type DeckProps = {
    title?: string
    cards: Card[]
}

export function DeckComponent({ cards, title = '' }: DeckProps) {

    return (
        <div className={styles.deckWrapper}>
            <span className={styles.title}>{title}</span>
            <div
                className={styles.deck}
            >
                <span className={styles.size}>{cards.length}</span>
            </div>
        </div>
    )
}