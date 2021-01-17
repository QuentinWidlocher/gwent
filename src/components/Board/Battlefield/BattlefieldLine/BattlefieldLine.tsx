import React from "react"
import { Card, cardToComponent } from "../../../../models/card"
import { BATTLEFIELD_LINE } from "../Battlefield"
import styles from "./BattlefieldLine.module.css"

export interface BattlefieldLineProps {
    cards: Card[],
    type: BATTLEFIELD_LINE,
    dark?: boolean,
    onClick?: () => void
}

export function BattlefieldLineComponent(props: BattlefieldLineProps) {
    return (
        <div
            className={`
                ${styles.line}
                ${props.dark ? styles.dark : ''}
            `}
            onClick={() => !!props.onClick && props.onClick()}
        >
            { props.cards.map(cardToComponent)}
        </div>
    )
}