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

    function battlefieldLineSelect(lineType: BATTLEFIELD_LINE) {
        if ([BATTLEFIELD_LINE.ENEMY_MELEE, BATTLEFIELD_LINE.ENEMY_RANGED, BATTLEFIELD_LINE.ENEMY_SIEGE].includes(lineType)) {
            return
        }

        if (!selectedCard) {
            return
        }


    }

    return (
        <div className={styles.board}>
            <div className={styles.scores}></div>
            <div className={styles.battlefield}>
                <BattlefieldComponent
                    enemySiegeLine={[]}
                    enemyRangedLine={[]}
                    enemyMeleeLine={[]}
                    playerMeleeLine={[]}
                    playerRangedLine={[]}
                    playerSiegeLine={[]}

                    onLineClick={battlefieldLineSelect}
                />
            </div>
            <div className={styles.playerHand}>
                <PlayerHandComponent
                    cards={props.cards}
                    onCardSelect={setSelectedCard}
                />
            </div>
            <div className={styles.decks}></div>
        </div>
    )
}