import { remove } from "ramda"
import React, { useState } from "react"
import { Card } from "../../models/card"
import { BattlefieldComponent, BATTLEFIELD_LINE } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { PlayerHandComponent } from "./PlayerHand/PlayerHand"

export interface BoardProps {
    cards: Card[]
}

export function BoardComponent(props: BoardProps) {

    const [selectedCard, setSelectedCard] = useState<Card | null>(null)
    const [rows, setRows] = useState<Record<BATTLEFIELD_LINE, Card[]>>({
        [BATTLEFIELD_LINE.ENEMY_SIEGE]: [],
        [BATTLEFIELD_LINE.ENEMY_RANGED]: [],
        [BATTLEFIELD_LINE.ENEMY_MELEE]: [],
        [BATTLEFIELD_LINE.PLAYER_MELEE]: [],
        [BATTLEFIELD_LINE.PLAYER_RANGED]: [],
        [BATTLEFIELD_LINE.PLAYER_SIEGE]: [],
    })
    const [playerHand, setPlayerHand] = useState<Card[]>(props.cards)

    function battlefieldLineSelect(lineType: BATTLEFIELD_LINE) {
        if ([BATTLEFIELD_LINE.ENEMY_MELEE, BATTLEFIELD_LINE.ENEMY_RANGED, BATTLEFIELD_LINE.ENEMY_SIEGE].includes(lineType)) {
            return
        }

        if (!selectedCard) {
            return
        }

        const mutatedRow = rows
        mutatedRow[lineType].push(selectedCard)
        setRows(rows)

        const mutatedPlayerHand = playerHand
        mutatedPlayerHand.splice(playerHand.findIndex(c => c.title == selectedCard.title), 1)
        setPlayerHand(mutatedPlayerHand)

        setSelectedCard(null)
    }

    return (
        <div className={styles.board}>
            <div className={styles.scores}></div>
            <div className={styles.battlefield}>
                <BattlefieldComponent
                    enemySiegeLine={rows[BATTLEFIELD_LINE.ENEMY_SIEGE]}
                    enemyRangedLine={rows[BATTLEFIELD_LINE.ENEMY_RANGED]}
                    enemyMeleeLine={rows[BATTLEFIELD_LINE.ENEMY_MELEE]}
                    playerMeleeLine={rows[BATTLEFIELD_LINE.PLAYER_MELEE]}
                    playerRangedLine={rows[BATTLEFIELD_LINE.PLAYER_RANGED]}
                    playerSiegeLine={rows[BATTLEFIELD_LINE.PLAYER_SIEGE]}

                    onLineClick={battlefieldLineSelect}

                    playerLinesCanBeSelected={!!selectedCard}
                />
            </div>
            <div className={styles.playerHand}>
                <PlayerHandComponent
                    cards={playerHand}
                    selectedCard={selectedCard}
                    onCardSelect={setSelectedCard}
                />
            </div>
            <div className={styles.decks}></div>
        </div>
    )
}