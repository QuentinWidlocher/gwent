import { remove, sum } from "ramda"
import React, { useEffect, useState } from "react"
import { Card, isPlacedCard, Modifier, PlacedCard } from "../../models/card"
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, ENEMY_LINES, PLAYER_LINES } from "../../models/cardlist"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { PlayerHandComponent } from "./PlayerHand/PlayerHand"
import { ScoresComponent } from "./Scores/Scores"

export interface BoardProps {
    playerDeck: Card[]
    enemyDeck: Card[]
}

export interface Round {
    playerPoints: number,
    enemyPoints: number
}

export function BoardComponent(props: BoardProps) {

    const enemyFakeThinkingTime = 500
    const emptyRows: Record<BATTLEFIELD_LINE, PlacedCard[]> = {
        [BATTLEFIELD_LINE.ENEMY_SIEGE]: [],
        [BATTLEFIELD_LINE.ENEMY_RANGED]: [],
        [BATTLEFIELD_LINE.ENEMY_MELEE]: [],
        [BATTLEFIELD_LINE.PLAYER_MELEE]: [],
        [BATTLEFIELD_LINE.PLAYER_RANGED]: [],
        [BATTLEFIELD_LINE.PLAYER_SIEGE]: [],
    }

    const [selectedCard, setSelectedCard] = useState<Card | null>(null)
    const [rows, setRows] = useState(emptyRows)

    const [playerHand, setPlayerHand] = useState<Card[]>(props.playerDeck.slice(0, 10))
    const [enemyHand, setEnemyHand] = useState<Card[]>(props.enemyDeck.slice(0, 10))

    const [playerTurn, setPlayerTurn] = useState<boolean>(true)//Math.random() >= 0.5)

    const [playerPoints, setPlayerPoints] = useState(0)
    const [enemyPoints, setEnemyPoints] = useState(0)

    const [rounds, setRounds] = useState<Round[]>([])

    useEffect(function enemyTurn() {
        if (!playerTurn && enemyHand.length > 0) {
            let enemySelectedCard = enemyHand[Math.floor(Math.random() * enemyHand.length)]

            if (isPlacedCard(enemySelectedCard)) {
                let availableLines = enemySelectedCard.unitTypes.flatMap(type => CARD_AUTHORIZED_LINES[type].filter(line => ENEMY_LINES.includes(line)))
                let enemySelectedLine = availableLines[Math.floor(Math.random() * availableLines.length)]
                playCard(enemySelectedCard, enemySelectedLine, enemyHand, setEnemyHand)
            } else {

            }
            setPlayerTurn(true)
        }
    }, [playerTurn])

    useEffect(function computePoints() {
        setPlayerPoints(getTotalPoints(PLAYER_LINES))
        setEnemyPoints(getTotalPoints(ENEMY_LINES))
    }, [Object.values(rows)])

    useEffect(function onRoundChange() {

        let enemyVictories = rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints > playerPoints).length
        let playerVictories = rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints < playerPoints).length

        if (rounds.length >= 3 || enemyVictories >= 2 || playerVictories >= 2) {
            console.log(rounds)
            if (enemyVictories == playerVictories) {
                alert('Draw !')
            } else {
                let playerWon = playerVictories > enemyVictories
                alert(`${playerWon ? 'You' : 'Your opponent'} win${playerWon ? '' : 's'} !`)
            }
        }
    }, [rounds])

    function computeBattlefieldPoints() {
        let newBattlefield = emptyRows

        for (let lineType in BATTLEFIELD_LINE) {
            let line = rows[(Number(lineType)) as BATTLEFIELD_LINE]

            if (!line) continue

            line = line.map(card => ({ ...card, apparentStrength: card.strength }))

            let lineModifiers: [Modifier, PlacedCard][] = []

            for (let card of line) {
                if (!!card.modifyPoints) {
                    lineModifiers.push([card.modifyPoints, card])
                }
            }

            let modifiers = lineModifiers.sort(([m]) => m.priority).reverse()
            let newLine = modifiers.reduce((curLine, [m, c]) => m.effect(c, curLine), line)

            newBattlefield[(Number(lineType)) as BATTLEFIELD_LINE] = newLine
        }

        setRows(newBattlefield)
    }

    function playCard(card: PlacedCard, line: BATTLEFIELD_LINE, hand: Card[], setHand: (cards: Card[]) => void) {
        card.apparentStrength = card.strength

        let mutatedRow = rows
        mutatedRow[line].push(card)
        setRows(mutatedRow)

        let mutatedHand = [...hand]
        mutatedHand.splice(hand.findIndex(c => c.title == card.title), 1)
        setHand(mutatedHand)

        if (!!card.onCardPlayed) {
            let { playerHand: newPlayerHand, enemyHand: newEnemyHand, board: newBoard } = card.onCardPlayed({
                playerDeck: [],
                playerDiscard: [],
                playerHand,
                enemyDeck: [],
                enemyDiscard: [],
                enemyHand,
                board: rows
            });

            setPlayerHand(newPlayerHand)
            setEnemyHand(newEnemyHand)
            setRows(newBoard)
        }

        computeBattlefieldPoints()
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

        if (isPlacedCard(selectedCard)) {
            // You can't play on a wrong line
            if (!selectedCard.unitTypes.some(type => CARD_AUTHORIZED_LINES[type].includes(lineType))) {
                return
            }

            playCard(selectedCard, lineType, playerHand, setPlayerHand)
        } else {

        }

        setSelectedCard(null)

        setTimeout(() => setPlayerTurn(false), enemyFakeThinkingTime)
    }

    function getTotalPoints(rowList: BATTLEFIELD_LINE[]) {
        return sum(rowList.flatMap(line => rows[line].filter(isPlacedCard).map(card => card.apparentStrength ?? card.strength)))
    }

    function endRound() {
        if (rounds.length >= 3) {
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
                    rounds={rounds}
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
                    selectableLines={(selectedCard && isPlacedCard(selectedCard)) ?
                        selectedCard.unitTypes.flatMap(type => CARD_AUTHORIZED_LINES[type])
                        : null
                    }
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