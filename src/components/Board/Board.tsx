import React, { useEffect, useState } from "react"
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, EMPTY_BATTLEFIELD_ROWS, ENEMY_LINES, PLAYER_LINES } from "../../constants/constants"
import { battlefieldFromEnemyPerspective, getTotalStrength, mapBattlefield } from "../../helpers/battlefield"
import { getAuthorizedLines, canBePlaced, lineFromEnemyPerspective } from "../../helpers/cards"
import { removeCardFromHand } from "../../helpers/hand"
import { notNil } from "../../helpers/helpers"
import { computeBattlefieldPoints } from "../../rules/battlefield"
import { Battlefield } from "../../types/aliases"
import { BaseCard, Card, PlacedCard } from "../../types/card"
import { GameState } from "../../types/game-state"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { PlayerHandComponent } from "./PlayerHand/PlayerHand"
import { ScoresComponent } from "./Scores/Scores"
import { WeatherBoxComponent } from "./WeatherBox/WeatherBox"

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

    const [weatherCards, setWeatherCards] = useState<PlacedCard[]>([])

    const [playerHand, setPlayerHand] = useState<Card[]>(props.playerDeck.slice(0, 10))
    const [enemyHand, setEnemyHand] = useState<Card[]>(props.enemyDeck.slice(0, 10))

    const [playerDeck, setPlayerDeck] = useState<Card[]>(props.playerDeck.slice(10))
    const [enemyDeck, setEnemyDeck] = useState<Card[]>(props.enemyDeck.slice(10))

    const [playerPoints, setPlayerPoints] = useState(0)
    const [enemyPoints, setEnemyPoints] = useState(0)

    const [rounds, setRounds] = useState<Round[]>([])

    const [playerTurn, setPlayerTurn] = useState<boolean>(Math.random() >= 0.5)

    useEffect(function enemyTurn() {
        // The enemy only plays on his turn if he still have cards
        if (!playerTurn && enemyHand.length > 0) {
            // Select a random card from his hand
            let enemySelectedCard = enemyHand[Math.floor(Math.random() * enemyHand.length)]

            // Place it on the battlefield or play the effect
            if (canBePlaced(enemySelectedCard)) {

                // Find all line where the card can naturally go
                let availableLines = enemySelectedCard.unitTypes
                    .flatMap(type => CARD_AUTHORIZED_LINES[type])
                    .filter(line => ENEMY_LINES.includes(line))

                if (notNil(enemySelectedCard.authorizedLines)) {
                    availableLines = enemySelectedCard.authorizedLines.map(lineFromEnemyPerspective)
                }

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
        setPlayerPoints(getTotalStrength(battlefield, PLAYER_LINES))
        setEnemyPoints(getTotalStrength(battlefield, ENEMY_LINES))
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

    useEffect(() => {
        console.debug({
            playerDeck,
            playerHand,
            enemyDeck,
            enemyHand,
            weatherCards,
            battlefield,
        })
    })

    // Placing the card means putting it on the battlefield
    function placeCard(card: PlacedCard, line: BATTLEFIELD_LINE, fromPlayerHand: boolean = true) {
        // We make sure the card has a strength to display
        card.strength = card.originalStrength

        let rowsWithCard: Battlefield = { ...battlefield }
        rowsWithCard[line].push(card)

        playCard(card, fromPlayerHand, { battlefield: rowsWithCard }, line)
    }

    // Playing a card is independant from playing it on the board or activating a special card
    function playCard(card: Card, fromPlayerPov: boolean, alreadyModifiedGameState?: Partial<GameState>, linePlacedOn?: BATTLEFIELD_LINE) {

        let handWithoutCard = removeCardFromHand(card, fromPlayerPov ? playerHand : enemyHand)

        // We make a snapshot of the game right now (having placed the card from the hand to the battlefield if necessary)
        let newGameState = alreadyModifiedGameState as GameState

        if (fromPlayerPov) {
            newGameState = {
                playerDeck,
                playerDiscard: [],
                playerHand: handWithoutCard,
                enemyDeck,
                enemyDiscard: [],
                enemyHand,
                weatherCards,
                battlefield,
                ...alreadyModifiedGameState
            }
        } else {
            newGameState = {
                playerDeck: enemyDeck,
                playerDiscard: [],
                playerHand: handWithoutCard,
                enemyDeck: playerDeck,
                enemyDiscard: [],
                enemyHand: playerHand,
                weatherCards,
                battlefield,
                ...alreadyModifiedGameState
            }
        }

        if (notNil(card.canBePlayed) && !card.canBePlayed(card, newGameState, linePlacedOn)) {
            console.log('Card', card.title, 'could not be played')
            return
        }

        // We update the game state if the card has an effect
        if (notNil(card.onCardPlayed)) {
            newGameState = card.onCardPlayed(card, newGameState);
        }

        // We then update the component with this new game state
        // TODO: implement all the components
        if (fromPlayerPov) {
            setPlayerDeck(newGameState.playerDeck)
            // setPlayerDiscard(newGameState.playerDiscard)
            setPlayerHand(newGameState.playerHand)
            setEnemyDeck(newGameState.enemyDeck)
            // setEnemyDiscard(newGameState.enemyDiscard)
            setEnemyHand(newGameState.enemyHand)
        } else {
            setPlayerDeck(newGameState.enemyDeck)
            // setPlayerDiscard(newGameState.playerDiscard)
            setPlayerHand(newGameState.enemyHand)
            setEnemyDeck(newGameState.playerDeck)
            // setEnemyDiscard(newGameState.enemyDiscard)
            setEnemyHand(newGameState.playerHand)
        }

        setWeatherCards(newGameState.weatherCards)
        setBattlefield(newGameState.battlefield)

        console.info(playerTurn ? 'Player' : 'Opponent', 'played', card.title)

        setBattlefield(computeBattlefieldPoints(newGameState.battlefield))

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

        if (notNil(lineType) && canBePlaced(selectedCard)) {
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

    function endRound() {
        if (rounds.length >= 3) {
            return
        }

        setRounds([...rounds, { playerPoints, enemyPoints }])
        setBattlefield(EMPTY_BATTLEFIELD_ROWS)
    }

    return (
        <div className={styles.board}>
            <div className={styles.scores}>
                <ScoresComponent
                    enemyPoints={enemyPoints}
                    playerPoints={playerPoints}
                    rounds={rounds}
                >
                    <WeatherBoxComponent
                        cards={weatherCards}
                    />
                </ScoresComponent>
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

                    linesCanBeSelected={notNil(selectedCard) && canBePlaced(selectedCard)}
                    battlefieldCanBeSelected={notNil(selectedCard) && !canBePlaced(selectedCard)}

                    selectableLines={
                        (selectedCard && canBePlaced(selectedCard))
                            ? getAuthorizedLines(selectedCard, playerTurn)
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