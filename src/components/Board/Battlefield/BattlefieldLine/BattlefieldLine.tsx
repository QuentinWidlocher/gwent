import React from "react"
import { Card, cardToComponent } from "../../../../models/card"
import styles from "./BattlefieldLine.module.css"

export interface BattlefieldLineProps {
    cards: Card[],
    dark?: boolean,
}

export function BattlefieldLineComponent(props: BattlefieldLineProps) {
    return (
        <div className={props.dark ? styles.darkLine : styles.line}>
            { props.cards.map(cardToComponent)}
        </div>
    )
}