import React from 'react'
import { Round } from '../Board'
import styles from './Scores.module.css'

export type ScoresProps = React.PropsWithChildren<{
	enemyPoints: number;
	enemyHasPassed: boolean;
	playerPoints: number;
	playerHasPassed: boolean;
	rounds: Round[];
}>;

export function ScoresComponent(props: ScoresProps) {
	const isEnemyWinning = props.enemyPoints > props.playerPoints
	const isPlayerWinning = props.enemyPoints < props.playerPoints
	const enemyVictories = props.rounds.filter(
		({ enemyPoints, playerPoints }) => enemyPoints > playerPoints
	).length
	const playerVictories = props.rounds.filter(
		({ enemyPoints, playerPoints }) => enemyPoints < playerPoints
	).length

	return (
		<div className={styles.scores}>
			<div className={styles.tab}>
				<span className={isEnemyWinning ? styles.winning : ''}>
					Your opponent : {props.enemyPoints}
				</span>
				{props.enemyHasPassed && <span>Passed</span>}
				<span>{Array(enemyVictories).fill('•').join('')}</span>
			</div>
			<div className={styles.weathers}>{props.children}</div>
			<div className={styles.tab}>
				<span className={isPlayerWinning ? styles.winning : ''}>
					You : {props.playerPoints}
				</span>
				{props.playerHasPassed && <span>Passed</span>}
				<span>{Array(playerVictories).fill('•').join('')}</span>
			</div>
		</div>
	)
}
