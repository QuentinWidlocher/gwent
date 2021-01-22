import React from "react"
import { BATTLEFIELD_LINE, CARD_TYPE } from "../../../../constants/constants"
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

    let modifiers = props.cards.filter(card => card.type == CARD_TYPE.MODIFIER)
    let cards = props.cards.filter(card => card.type == CARD_TYPE.PLACED)

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
            <div className={styles.modifiers}>
                {modifiers.map(cardToComponent)}
            </div>
            <div className={styles.cards}>
                {cards.map(cardToComponent)}
            </div>
        </div>
    )
}