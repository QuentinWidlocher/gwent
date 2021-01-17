import React from "react"
import { Card } from "../../../models/card"
import { CardComponent } from "../Card/Card"
import styles from "./Battlefield.module.css"
import { BattlefieldLineComponent } from "./BattlefieldLine/BattlefieldLine"

export interface BattlefieldProps {
    enemySiegeLine: Card[],
    enemyRangedLine: Card[],
    enemyMeleeLine: Card[],
    playerMeleeLine: Card[],
    playerRangedLine: Card[],
    playerSiegeLine: Card[],
}

type LineConfig = { style: string, cards: Card[] }

export function BattlefieldComponent(props: BattlefieldProps) {

    const linesConfig: LineConfig[] = [
        { style: styles.enemySiegeLine, cards: props.enemySiegeLine },
        { style: styles.enemyRangedLine, cards: props.enemyRangedLine },
        { style: styles.enemyMeleeLine, cards: props.enemyMeleeLine },
        { style: styles.playerMeleeLine, cards: props.playerMeleeLine },
        { style: styles.playerRangedLine, cards: props.playerRangedLine },
        { style: styles.playerSiegeLine, cards: props.playerSiegeLine },
    ]

    const lines = linesConfig.map((line, i) => (
        <div className={line.style}>
            <BattlefieldLineComponent cards={line.cards} dark={i % 2 == 0} />
        </div>
    ))

    return (
        <div className={styles.battlefield}>
            {lines}
        </div>
    )
}