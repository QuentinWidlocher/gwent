import React from "react"
import { Card } from "../../../models/card"
import { CardComponent } from "../Card/Card"
import styles from "./Battlefield.module.css"
import { BattlefieldLineComponent } from "./BattlefieldLine/BattlefieldLine"

export enum BATTLEFIELD_LINE {
    ENEMY_SIEGE,
    ENEMY_RANGED,
    ENEMY_MELEE,
    PLAYER_SIEGE,
    PLAYER_RANGED,
    PLAYER_MELEE,
}

export interface BattlefieldProps {
    enemySiegeLine: Card[],
    enemyRangedLine: Card[],
    enemyMeleeLine: Card[],
    playerMeleeLine: Card[],
    playerRangedLine: Card[],
    playerSiegeLine: Card[],
    onLineClick?: (lineType: BATTLEFIELD_LINE) => void,
    playerLinesCanBeSelected?: boolean
}

type LineConfig = { type: BATTLEFIELD_LINE, style: string, cards: Card[], canBeSelected: boolean }

export function BattlefieldComponent(props: BattlefieldProps) {

    const linesConfig: LineConfig[] = [
        { type: BATTLEFIELD_LINE.ENEMY_SIEGE, style: styles.enemySiegeLine, cards: props.enemySiegeLine, canBeSelected: false },
        { type: BATTLEFIELD_LINE.ENEMY_RANGED, style: styles.enemyRangedLine, cards: props.enemyRangedLine, canBeSelected: false },
        { type: BATTLEFIELD_LINE.ENEMY_MELEE, style: styles.enemyMeleeLine, cards: props.enemyMeleeLine, canBeSelected: false },
        { type: BATTLEFIELD_LINE.PLAYER_MELEE, style: styles.playerMeleeLine, cards: props.playerMeleeLine, canBeSelected: props.playerLinesCanBeSelected ?? false },
        { type: BATTLEFIELD_LINE.PLAYER_RANGED, style: styles.playerRangedLine, cards: props.playerRangedLine, canBeSelected: props.playerLinesCanBeSelected ?? false },
        { type: BATTLEFIELD_LINE.PLAYER_SIEGE, style: styles.playerSiegeLine, cards: props.playerSiegeLine, canBeSelected: props.playerLinesCanBeSelected ?? false },
    ]

    const lines = linesConfig.map((line, i) => (
        <div className={line.style}>
            <BattlefieldLineComponent
                cards={line.cards}
                type={line.type}
                canBeSelected={line.canBeSelected}
                dark={i % 2 == 0}
                onClick={() => !!props.onLineClick && props.onLineClick(line.type)}
            />
        </div>
    ))

    return (
        <div className={styles.battlefield}>
            {lines}
        </div>
    )
}