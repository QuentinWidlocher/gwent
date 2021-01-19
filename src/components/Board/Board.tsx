import { remove, sum } from "ramda"
import React, { useEffect, useState } from "react"
import { Card } from "../../models/card"
import { BATTLEFIELD_LINE, ENEMY_LINES, CARD_AUTHORIZED_LINES, PLAYER_LINES } from "../../models/constants"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { PlayerHandComponent } from "./PlayerHand/PlayerHand"
import { ScoresComponent } from "./Scores/Scores"

export interface BoardProps {
    playerDeck: Card[]
    enemyDeck: Card[]
}

interface Round {
    playerPoints: number,
    enemyPoints: number
}

export function BoardComponent(props: BoardProps) {

    const enemyFakeThinkingTime = 500
    const emptyRows: Record<BATTLEFIELD_LINE, Card[]> = {
        [BATTLEFIELD_LINE.ENEMY_SIEGE]: [],
        [BATTLEFIELD_LINE.ENEMY_RANGED]: [],
        [BATTLEFIELD_LINE.ENEMY_MELEE]: [],
        [BATTLEFIELD_LINE.PLAYER_MELEE]: [],
        [BATTLEFIELD_LINE.PLAYER_RANGED]: [],
        [BATTLEFIELD_LINE.PLAYER_SIEGE]: [],
    }

    const [selectedCard, setSelectedCard] = useState<Card | null>(null)
    const [rows, setRows] = useState(emptyRows)

    const [playerHand, setPlayerHand] = useState<Card[]>(props.playerDeck.slice(0,10))
    const [enemyHand, setEnemyHand] = useState<Card[]>(props.enemyDeck.slice(0, 10))

    const [playerTurn, setPlayerTurn] = useState<boolean>(Math.random() >= 0.5)

    const [playerPoints, setPlayerPoints] = useState(0)
    const [enemyPoints, setEnemyPoints] = useState(0)

    const [rounds, setRounds] = useState<Round[]>([])

    useEffect(function enemyTurn(){
        if (!playerTurn && enemyHand.length > 0) {
            let enemySelectedCard = enemyHand[Math.floor(Math.random() * enemyHand.length)]
            let availableLines = enemySelectedCard.types.flatMap(type => CARD_AUTHORIZED_LINES[type].filter(line => ENEMY_LINES.includes(line)))
            let enemySelectedLine = availableLines[Math.floor(Math.random() * availableLines.length)]
            playCard(enemySelectedCard, enemySelectedLine, enemyHand, setEnemyHand)
            setPlayerTurn(true)
        }
    }, [playerTurn])

    useEffect(function computePoints() {
        setPlayerPoints(getTotalPoints(PLAYER_LINES))
        setEnemyPoints(getTotalPoints(ENEMY_LINES))
    }, [Object.values(rows)])

    useEffect(function onRoundChange() {
        if (rounds.length >= 2) {
            let playerTotalPoints = sum(rounds.map(round => round.playerPoints))
            let enemyTotalPoints = sum(rounds.map(round => round.enemyPoints))
            let playerWon = playerTotalPoints > enemyTotalPoints
            alert(`${playerWon ? 'You' : 'Your opponent'} win${playerWon ? '' : 's'} !`)
        }
    }, [rounds])

    function playCard(card: Card, line: BATTLEFIELD_LINE, hand: Card[], setHand: (cards: Card[]) => void) {
        let mutatedRow = rows
        mutatedRow[line].push(card)
        console.log('bah oe')
        setRows(mutatedRow)

        let mutatedHand = [...hand]
        mutatedHand.splice(hand.findIndex(c => c.title == card.title), 1)
        setHand(mutatedHand)
    }

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
        if (!selectedCard.types.some(type => CARD_AUTHORIZED_LINES[type].includes(lineType))) {
            return
        }

        playCard(selectedCard, lineType, playerHand, setPlayerHand)

        setSelectedCard(null)
        
        setTimeout(() => setPlayerTurn(false), enemyFakeThinkingTime)
    }

    function getTotalPoints(rowList: BATTLEFIELD_LINE[]) {
        return sum(rowList.flatMap(line => rows[line].map(card => card.strength)))
    }

    function endRound() {
        if (rounds.length >= 2) {
            return
        }

        setRounds([...rounds, { playerPoints, enemyPoints }])
        setRows(emptyRows)
    }

    return (
        <div className={styles.board}>
            <div className={styles.scores}>
                <ScoresComponent
                    enemyPoints={enemyPoints}
                    playerPoints={playerPoints}
                />
            </div>
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
                    selectableLines={selectedCard && selectedCard.types.flatMap(type => CARD_AUTHORIZED_LINES[type])}
                />
            </div>
            <div className={styles.playerHand}>
                <PlayerHandComponent
                    cards={playerHand}
                    selectedCard={selectedCard}
                    onCardSelect={setSelectedCard}
                    canSelectCards={playerTurn}
                />
            </div>
            <div className={styles.decks}>
                <button onClick={endRound}>End round</button>
            </div>
        </div>
    )
}