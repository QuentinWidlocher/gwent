import React from "react"
import { Card, cardToComponent, PlacedCard } from "../../../../models/card"
import { BATTLEFIELD_LINE } from "../../../../models/cardlist"
import styles from "./BattlefieldLine.module.css"

export interface BattlefieldLineProps {
    cards: (PlacedCard)[],
    type: BATTLEFIELD_LINE,
    totalStrength: number
    dark?: boolean,
    canBeSelected?: boolean,
    onClick?: () => void,
}

export function BattlefieldLineComponent(props: BattlefieldLineProps) {
    return (
        <div
            className={[
                (styles.line),
                (props.dark ? styles.dark : ''),
                (props.canBeSelected ? styles.canBeSelected : ''),
            ].join(' ')}
            onClick={() => !!props.onClick && props.onClick()}
        >
            <span className={styles.strength}>{props.totalStrength}</span>
            <div className={styles.cards}>
                {props.cards.map(cardToComponent)}
            </div>
        </div>
    )
}