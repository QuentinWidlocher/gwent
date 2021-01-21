import { prop, sum } from "ramda"
import React from "react"
import { Card, isPlacedCard, PlacedCard } from "../../../models/card"
import { BATTLEFIELD_LINE } from "../../../models/cardlist"
import styles from "./Battlefield.module.css"
import { BattlefieldLineComponent } from "./BattlefieldLine/BattlefieldLine"

export interface BattlefieldProps {
    enemySiegeLine: PlacedCard[],
    enemyRangedLine: PlacedCard[],
    enemyMeleeLine: PlacedCard[],
    playerMeleeLine: PlacedCard[],
    playerRangedLine: PlacedCard[],
    playerSiegeLine: PlacedCard[],
    onLineClick?: (lineType: BATTLEFIELD_LINE) => void,
    playerLinesCanBeSelected?: boolean,
    selectableLines: BATTLEFIELD_LINE[] | null,
}

type LineConfig = { type: BATTLEFIELD_LINE, style: string, cards: PlacedCard[], canBeSelected: boolean }

export function BattlefieldComponent(props: BattlefieldProps) {

    const linesConfig: LineConfig[] = [
        { type: BATTLEFIELD_LINE.ENEMY_SIEGE, style: styles.enemySiegeLine, cards: props.enemySiegeLine, canBeSelected: false },
        { type: BATTLEFIELD_LINE.ENEMY_RANGED, style: styles.enemyRangedLine, cards: props.enemyRangedLine, canBeSelected: false },
        { type: BATTLEFIELD_LINE.ENEMY_MELEE, style: styles.enemyMeleeLine, cards: props.enemyMeleeLine, canBeSelected: false },
        { type: BATTLEFIELD_LINE.PLAYER_MELEE, style: styles.playerMeleeLine, cards: props.playerMeleeLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.PLAYER_MELEE) },
        { type: BATTLEFIELD_LINE.PLAYER_RANGED, style: styles.playerRangedLine, cards: props.playerRangedLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.PLAYER_RANGED) },
        { type: BATTLEFIELD_LINE.PLAYER_SIEGE, style: styles.playerSiegeLine, cards: props.playerSiegeLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.PLAYER_SIEGE) },
    ]

    function canLineBeSelected(lineType: BATTLEFIELD_LINE) {
        return (props.playerLinesCanBeSelected ?? false) && (props.selectableLines?.includes(lineType) ?? false)
    }

    const lines = linesConfig.map((line, i) => (
        <div className={line.style} key={`battlefield_line_${i}`}>
            <BattlefieldLineComponent
                cards={line.cards}
                type={line.type}
                totalStrength={sum(line.cards.filter(isPlacedCard).map(c => c.apparentStrength ?? c.strength))}
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