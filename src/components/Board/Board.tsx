import { remove } from "ramda"
import React, { useState } from "react"
import { Card } from "../../models/card"
import { BATTLEFIELD_LINE, ENEMY_LINES, CARD_AUTHORIZED_LINES } from "../../models/constants"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
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
        // You can't play if you haven't selected a card
        if (!selectedCard) {
            return
        }

        // You can't play on the enemy side
        if (ENEMY_LINES.includes(lineType)) {
            return
        }


        // You can't play on a wrong line
        if (!CARD_AUTHORIZED_LINES[selectedCard.type].includes(lineType)) {
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
                    selectableLines={selectedCard && CARD_AUTHORIZED_LINES[selectedCard.type]}
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