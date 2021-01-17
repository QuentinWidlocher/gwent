import React from "react"
import { Card } from "../../models/card"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { PlayerHandComponent } from "./PlayerHand/PlayerHand"

export interface BoardProps {
    cards: Card[]
}

export function BoardComponent(props: BoardProps) {
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
                />
            </div>
            <div className={styles.playerHand}>
                <PlayerHandComponent
                    cards={props.cards}
                />
            </div>
            <div className={styles.decks}></div>
        </div>
    )
}