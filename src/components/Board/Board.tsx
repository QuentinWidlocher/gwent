import { sum } from "ramda"
import React, { useEffect, useState } from "react"
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, EMPTY_BATTLEFIELD_ROWS, ENEMY_LINES, PLAYER_LINES } from "../../constants/constants"
import { mapOverBattlefield } from "../../helpers/battlefield"
import { getLineStrength, isPlacedCard } from "../../helpers/cards"
import { notNil } from "../../helpers/helpers"
import { BaseCard, Card, Modifier, PlacedCard } from "../../types/card"
import { GameState } from "../../types/game-state"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { PlayerHandComponent } from "./PlayerHand/PlayerHand"
import { ScoresComponent } from "./Scores/Scores"

export type BoardProps = {
    playerDeck: Card[]
    enemyDeck: Card[]
}
export type Round = {
    playerPoints: number,
    enemyPoints: number
}

const enemyFakeThinkingTime = 500

export function BoardComponent(props: BoardProps) {

    const [selectedCard, setSelectedCard] = useState<Card | null>(null)
    const [battlefield, setBattlefield] = useState(EMPTY_BATTLEFIELD_ROWS)

    const [playerHand, setPlayerHand] = useState<Card[]>(props.playerDeck.slice(0, 10))
    const [enemyHand, setEnemyHand] = useState<Card[]>(props.enemyDeck.slice(0, 10))

    const [playerTurn, setPlayerTurn] = useState<boolean>(Math.random() >= 0.5)

    const [playerPoints, setPlayerPoints] = useState(0)
    const [enemyPoints, setEnemyPoints] = useState(0)

    const [rounds, setRounds] = useState<Round[]>([])

    useEffect(function enemyTurn() {

        // The enemy only plays on his turn if he still have cards
        if (!playerTurn && enemyHand.length > 0) {
            // Select a random card from his hand
            let enemySelectedCard = enemyHand[Math.floor(Math.random() * enemyHand.length)]

            // Place it on the battlefield or play the effect
            if (isPlacedCard(enemySelectedCard)) {
                // Find all line where the card can naturally go
                // TODO: allow the enemy to play spies
                let availableLines = enemySelectedCard.unitTypes
                    .flatMap(type => CARD_AUTHORIZED_LINES[type])
                    .filter(line => ENEMY_LINES.includes(line))

                // Select a random line
                let enemySelectedLine = availableLines[Math.floor(Math.random() * availableLines.length)]

                placeCard(enemySelectedCard, enemySelectedLine, false)
            } else {
                playCard(enemySelectedCard, false)
            }

            setPlayerTurn(true)
        }
    }, [playerTurn])

    // Trigger each time the battlefield change
    useEffect(function computePoints() {
        setPlayerPoints(getTotalPoints(PLAYER_LINES))
        setEnemyPoints(getTotalPoints(ENEMY_LINES))
    }, [Object.values(battlefield)])

    useEffect(function onRoundChange() {

        // Count the winned rounds (excluding draws of course)
        let enemyVictories = rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints > playerPoints).length
        let playerVictories = rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints < playerPoints).length

        // The game end if a player has won 2 rounds, or after 3 rounds
        if (rounds.length >= 3 || enemyVictories >= 2 || playerVictories >= 2) {
            if (enemyVictories == playerVictories) {
                alert('Draw !')
            } else {
                let playerWon = playerVictories > enemyVictories
                alert(`${playerWon ? 'You' : 'Your opponent'} win${playerWon ? '' : 's'} !`)
            }
        }
    }, [rounds])

    // Compute how many lines are worth taking in account the card modifiers
    function computeBattlefieldPoints() {

        let newBattlefield = mapOverBattlefield(battlefield, line => {
            // We reset all the strength to count again
            let resetLine: PlacedCard[] = line.map(card => ({ ...card, strength: card.originalStrength }))

            // A line modifier is a card and its modifier
            // We collect all the modifiers in the line
            let lineModifiers: [Modifier, PlacedCard][] = resetLine
                .filter(card => notNil(card.modifyPoints))
                .map(card => [card.modifyPoints!, card])

            // We sort the modifier starting from 0 to n
            let modifiers = lineModifiers.sort(([m]) => m.priority).reverse()

            // For each modifier, we provide its function the entire line and we get back the modified line
            // We then provide the modified line to the next modifier and so on
            return modifiers.reduce((curLine, [m, c]) => m.effect(c, curLine), resetLine)
        })

        setBattlefield(newBattlefield)
    }

    function removeCardFromHand(card: Card, hand: Card[]): Card[] {
        let mutatedHand = [...hand]
        mutatedHand.splice(hand.findIndex(c => c.id == card.id), 1)
        return mutatedHand
    }

    // Placing the card means putting it on the battlefield
    function placeCard(card: PlacedCard, line: BATTLEFIELD_LINE, fromPlayerHand: boolean) {
        // We make sure the card has a strength to display
        card.strength = card.originalStrength

        let rowsWithCard = { ...battlefield }
        rowsWithCard[line].push(card)

        playCard(card, fromPlayerHand, { board: rowsWithCard })

        computeBattlefieldPoints()
    }

    // Playing a card is independant from playing it on the board or activating a special card
    function playCard(card: Card, fromPlayerHand: boolean, alreadyModifiedGameState?: Partial<GameState>) {

        let handWithoutCard = removeCardFromHand(card, fromPlayerHand ? playerHand : enemyHand)

        // We make a snapshot of the game right now (having placed the card from the hand to the battlefield if necessary)
        let newGameState = {
            playerDeck: [],
            playerDiscard: [],
            playerHand: (fromPlayerHand ? handWithoutCard : playerHand),
            enemyDeck: [],
            enemyDiscard: [],
            enemyHand: (fromPlayerHand ? enemyHand : handWithoutCard),
            board: battlefield,
            ...alreadyModifiedGameState
        }

        // We update the game state if the card has an effect
        if (notNil(card.onCardPlayed)) {
            newGameState = card.onCardPlayed(card, newGameState);
        }

        // We then update the component with this new game state
        // TODO: implement all the components
        // setPlayerDeck(newGameState.playerDeck)
        // setPlayerDiscard(newGameState.playerDiscard)
        setPlayerHand(newGameState.playerHand)
        // setEnemyDeck(newGameState.enemyDeck)
        // setEnemyDiscard(newGameState.enemyDiscard)
        setEnemyHand(newGameState.enemyHand)
        setBattlefield(newGameState.board)

        endTurn()
    }

    // When the player clicks on a line
    function battlefieldLineSelect(lineType: BATTLEFIELD_LINE, card: PlacedCard) {
        let authorizedLines: BATTLEFIELD_LINE[] = []

        // If a card has authorizedLines, they override the defaults authorized line
        if (notNil(card.authorizedLines)) {
            authorizedLines = card.authorizedLines
        } else {
            // By default, a card is authorized to be placed on the card type row, in the player lines
            authorizedLines = card.unitTypes
                .flatMap(type => CARD_AUTHORIZED_LINES[type])
                .filter(line => PLAYER_LINES.includes(line))
        }

        // If we cannot place the card on the selected line we stop
        if (!authorizedLines.includes(lineType)) {
            return
        }

        placeCard(card, lineType, true)
    }

    // When the player clicks on the battlefield to play a special card
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

    // Unselect the card and play the next turn
    function endTurn() {
        setSelectedCard(null)
        setTimeout(() => setPlayerTurn(!playerTurn), enemyFakeThinkingTime)
    }

    // Sum the sums of all lines
    function getTotalPoints(rowList: BATTLEFIELD_LINE[]) {
        return sum(rowList.flatMap(line => getLineStrength(battlefield[line])))
    }

    function endRound() {
        if (rounds.length >= 3) {
            return
        }

        setRounds([...rounds, { playerPoints, enemyPoints }])
        setBattlefield(EMPTY_BATTLEFIELD_ROWS)
    }

    // Allow highlighting rows with the same rules as placing card
    // TODO: REALLY use the same rules instead of duplicating
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
                    enemySiegeLine={battlefield[BATTLEFIELD_LINE.ENEMY_SIEGE]}
                    enemyRangedLine={battlefield[BATTLEFIELD_LINE.ENEMY_RANGED]}
                    enemyMeleeLine={battlefield[BATTLEFIELD_LINE.ENEMY_MELEE]}
                    playerMeleeLine={battlefield[BATTLEFIELD_LINE.PLAYER_MELEE]}
                    playerRangedLine={battlefield[BATTLEFIELD_LINE.PLAYER_RANGED]}
                    playerSiegeLine={battlefield[BATTLEFIELD_LINE.PLAYER_SIEGE]}

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