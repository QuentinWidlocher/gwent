import React from "react"
import styles from "./Scores.module.css"

export interface ScoresProps {
    enemyPoints: number
    playerPoints: number
}

export function ScoresComponent(props: ScoresProps) {

    const isEnemyWinning = props.enemyPoints > props.playerPoints
    const isPlayerWinning = props.enemyPoints < props.playerPoints

    return (
        <div className={styles.scores}>
            <span className={[styles.tab, (isEnemyWinning ? styles.winning : '')].join(' ')}>
                Opponent : {props.enemyPoints}
            </span>
            <span className={[styles.tab, (isPlayerWinning ? styles.winning : '')].join(' ')}>
                You : {props.playerPoints}
            </span>
        </div>
    )
}