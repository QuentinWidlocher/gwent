import React, { FC } from "react"
import { Round } from "../Board"
import styles from "./Scores.module.css"

export type ScoresProps = {
    enemyPoints: number
    enemyHasPassed: boolean
    playerPoints: number
    playerHasPassed: boolean
    rounds: Round[]
}

export const ScoresComponent: FC<ScoresProps> = (props) => {

    let isEnemyWinning = props.enemyPoints > props.playerPoints
    let isPlayerWinning = props.enemyPoints < props.playerPoints
    let enemyVictories = props.rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints > playerPoints).length
    let playerVictories = props.rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints < playerPoints).length

    return (
        <div className={styles.scores}>
            <div className={styles.tab}>
                <span className={isEnemyWinning ? styles.winning : ''}>
                    Your opponent : {props.enemyPoints}
                </span>
                { props.enemyHasPassed && <span>Passed</span> }
                <span>
                    {Array(enemyVictories).fill('•').join('')}
                </span>
            </div>
            <div className={styles.weathers}>
                {props.children}
            </div>
            <div className={styles.tab}>
                <span className={isPlayerWinning ? styles.winning : ''}>
                    You : {props.playerPoints}
                </span>
                { props.playerHasPassed && <span>Passed</span>}
                <span>
                    {Array(playerVictories).fill('•').join('')}
                </span>
            </div>
        </div>
    )
}