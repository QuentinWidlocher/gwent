import React from "react"
import { BATTLEFIELD_LINE } from "../../../../constants/constants"
import { cardToComponent } from "../../../../helpers/cards"
import { notNil } from "../../../../helpers/helpers"
import { PlacedCard } from "../../../../types/card"
import styles from "./BattlefieldLine.module.css"

export type BattlefieldLineProps = {
    cards: PlacedCard[],
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
            onClick={() => notNil(props.onClick) && props.onClick()}
        >
            <span className={styles.strength}>{props.totalStrength}</span>
            <div className={styles.cards}>
                {props.cards.map(cardToComponent)}
            </div>
        </div>
    )
}