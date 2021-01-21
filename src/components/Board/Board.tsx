import { remove, sum } from "ramda"
import React, { useEffect, useState } from "react"
import { notNil } from "../../helpers"
import { BaseCard, Card, GameState, isPlacedCard, Modifier, PlacedCard } from "../../models/card"
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

export type BattlefieldRows = Record<BATTLEFIELD_LINE, PlacedCard[]>

const enemyFakeThinkingTime = 500
export const emptyBattlefieldRows: BattlefieldRows = {
    [BATTLEFIELD_LINE.ENEMY_SIEGE]: [],
    [BATTLEFIELD_LINE.ENEMY_RANGED]: [],
    [BATTLEFIELD_LINE.ENEMY_MELEE]: [],
    [BATTLEFIELD_LINE.PLAYER_MELEE]: [],
    [BATTLEFIELD_LINE.PLAYER_RANGED]: [],
    [BATTLEFIELD_LINE.PLAYER_SIEGE]: [],
}

export function BoardComponent(props: BoardProps) {

    const [selectedCard, setSelectedCard] = useState<Card | null>(null)
    const [rows, setRows] = useState(emptyBattlefieldRows)

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
                placeCard(enemySelectedCard, enemySelectedLine, false)
            } else {
                playCard(enemySelectedCard, false)
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
        let newBattlefield = emptyBattlefieldRows

        for (let lineType in BATTLEFIELD_LINE) {
            let line = rows[(Number(lineType)) as BATTLEFIELD_LINE]

            if (!line) continue

            line = line.map(card => ({ ...card, apparentStrength: card.strength }))

            let lineModifiers: [Modifier, PlacedCard][] = []

            for (let card of line) {
                if (notNil(card.modifyPoints)) {
                    lineModifiers.push([card.modifyPoints, card])
                }
            }

            let modifiers = lineModifiers.sort(([m]) => m.priority).reverse()
            let newLine = modifiers.reduce((curLine, [m, c]) => m.effect(c, curLine), line)

            newBattlefield[(Number(lineType)) as BATTLEFIELD_LINE] = newLine
        }

        setRows(newBattlefield)
    }

    function removeCardFromHand(card: Card, hand: Card[]): Card[] {
        let mutatedHand = [...hand]
        mutatedHand.splice(hand.findIndex(c => c.id == card.id), 1)
        return mutatedHand
    }

    function placeCard(card: PlacedCard, line: BATTLEFIELD_LINE, fromPlayerHand: boolean) {
        card.apparentStrength = card.strength

        let rowsWithCard = rows
        rowsWithCard[line].push(card)
        setRows(rowsWithCard)

        playCard(card, fromPlayerHand, { board: rowsWithCard })

        computeBattlefieldPoints()
    }

    function playCard(card: Card, fromPlayerHand: boolean, alreadyModifiedGameState?: Partial<GameState>) {

        let handWithoutCard = removeCardFromHand(card, fromPlayerHand ? playerHand : enemyHand)

        let newGameState = {
            playerDeck: [],
            playerDiscard: [],
            playerHand: (fromPlayerHand ? handWithoutCard : playerHand),
            enemyDeck: [],
            enemyDiscard: [],
            enemyHand: (fromPlayerHand ? enemyHand : handWithoutCard),
            board: rows,
            ...alreadyModifiedGameState
        }

        if (notNil(card.onCardPlayed)) {
            newGameState = card.onCardPlayed(card, newGameState);
        }

        // setPlayerDeck(newGameState.playerDeck)
        // setPlayerDiscard(newGameState.playerDiscard)
        setPlayerHand(newGameState.playerHand)
        // setEnemyDeck(newGameState.enemyDeck)
        // setEnemyDiscard(newGameState.enemyDiscard)
        setEnemyHand(newGameState.enemyHand)
        setRows(newGameState.board)

        endTurn()
    }

    function battlefieldLineSelect(lineType: BATTLEFIELD_LINE, card: PlacedCard) {
        let authorizedLines: BATTLEFIELD_LINE[] = []

        if (notNil(card.authorizedLines)) {
            authorizedLines = card.authorizedLines
        } else {
            authorizedLines = card.unitTypes
                .flatMap(type => CARD_AUTHORIZED_LINES[type])
                .filter(line => PLAYER_LINES.includes(line))
        }

        if (!authorizedLines.includes(lineType)) {
            return
        }

        placeCard(card, lineType, true)
    }

    function battlefieldAllSelect(card: BaseCard) {
        playCard(card, true)
    }

    function battlefieldSelect(lineType?: BATTLEFIELD_LINE) {
        // You can't play if you haven't selected a card
        if (!selectedCard) {
            return
        }

        if (notNil(lineType) && isPlacedCard(selectedCard)) {
            battlefieldLineSelect(lineType, selectedCard)
        } else {
            battlefieldAllSelect(selectedCard)
        }
    }

    function endTurn() {
        setSelectedCard(null)
        setTimeout(() => setPlayerTurn(!playerTurn), enemyFakeThinkingTime)
    }

    function getTotalPoints(rowList: BATTLEFIELD_LINE[]) {
        return sum(rowList.flatMap(line => rows[line].filter(isPlacedCard).map(card => card.apparentStrength ?? card.strength)))
    }

    function endRound() {
        if (rounds.length >= 3) {
            return
        }

        setRounds([...rounds, { playerPoints, enemyPoints }])
        setRows(emptyBattlefieldRows)
    }

    function getSelectableLines(card: PlacedCard): BATTLEFIELD_LINE[] {
        if (notNil(card.authorizedLines)) {
            return card.authorizedLines
        } else {
            return card.unitTypes
                .flatMap(type => CARD_AUTHORIZED_LINES[type])
                .filter(line => {
                    let authorizedLines = playerTurn ? PLAYER_LINES : ENEMY_LINES
                    return authorizedLines.includes(line)
                })
        }
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

                    onLineClick={battlefieldSelect}
                    onBoardClick={battlefieldSelect}

                    linesCanBeSelected={notNil(selectedCard) && isPlacedCard(selectedCard)}
                    battlefieldCanBeSelected={notNil(selectedCard) && !isPlacedCard(selectedCard)}

                    selectableLines={
                        (selectedCard && isPlacedCard(selectedCard))
                            ? getSelectableLines(selectedCard)
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