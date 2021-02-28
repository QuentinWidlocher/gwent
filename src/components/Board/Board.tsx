import { add, append, clone, isEmpty, not, tail } from "ramda"
import React, { useEffect, useState } from "react"
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, EMPTY_BATTLEFIELD_ROWS, ENEMY_LINES, PLAYER_LINES } from "../../constants/constants"
import { getTotalStrength } from "../../helpers/battlefield"
import { canBePlaced, getAuthorizedLines } from "../../helpers/cards"
import { notNil } from "../../helpers/helpers"
import { autoPlay, getBattlefieldAfterModifiers, getStateAfterPlayingCard, shouldEnemyPassTheTurn } from "../../rules/battlefield"
import { Card, PlacedCard } from "../../types/card"
import { GameState } from "../../types/game-state"
import { BattlefieldComponent } from "./Battlefield/Battlefield"
import styles from "./Board.module.css"
import { CardPreviewComponent } from "./CardPreview/CardPreview"
import { useCardSelectorContext } from "./CardSelector/CardSelector"
import { DeckComponent } from "./Deck/Deck"
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

export type AdditionnalTurn = {
    playedByPlayer: boolean,
    mustPlayCard: Card | null
}

const enemyFakeThinkingTime = 500

export function BoardComponent(props: BoardProps) {

    const [selectedCard, setSelectedCard] = useState<Card | null>(null)

    const [battlefield, setBattlefield] = useState(clone(EMPTY_BATTLEFIELD_ROWS))

    const [lockPlayerHand, setLockPlayerHand] = useState(false)

    const [weatherCards, setWeatherCards] = useState<PlacedCard[]>([])

    const [playerHand, setPlayerHand] = useState<Card[]>(props.playerDeck.slice(0, 10))
    const [enemyHand, setEnemyHand] = useState<Card[]>(props.enemyDeck.slice(0, 10))

    const [playerDeck, setPlayerDeck] = useState<Card[]>(props.playerDeck.slice(10))
    const [enemyDeck, setEnemyDeck] = useState<Card[]>(props.enemyDeck.slice(10))

    const [playerDiscard, setPlayerDiscard] = useState<Card[]>([])
    const [enemyDiscard, setEnemyDiscard] = useState<Card[]>([])

    const [playerPoints, setPlayerPoints] = useState(0)
    const [enemyPoints, setEnemyPoints] = useState(0)

    const [playerHasPassed, setPlayerHasPassed] = useState(false)
    const [enemyHasPassed, setEnemyHasPassed] = useState(false)

    const [rounds, setRounds] = useState<Round[]>([])

    const [playerTurn, setPlayerTurn] = useState<boolean>(Math.random() >= 0.5)
    const [additionnalTurns, setAdditionnalTurns] = useState<AdditionnalTurn[]>([])
    const [turns, setTurns] = useState(0)

    const cardSelectorContext = useCardSelectorContext()

    useEffect(function newTurn() {

        let gameState = getGameState()
        console.debug('Game State', gameState)

        // The enemy only plays on his turn if he still have cards
        if (!playerTurn && enemyHand.length > 0) {

            // Count the winned rounds (excluding draws of course)
            let enemyVictories = rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints > playerPoints).length
            let playerVictories = rounds.filter(({ enemyPoints, playerPoints }) => enemyPoints < playerPoints).length

            let itsLastRound = enemyVictories > 0 || playerVictories > 0

            if (shouldEnemyPassTheTurn(playerPoints, enemyPoints, playerHasPassed, itsLastRound, gameState)) {
                setEnemyHasPassed(true)
            } else {
                let [selectedCard, selectedLine, cardPlacedOn] = autoPlay(gameState)
                playCard(selectedCard, false, selectedLine, cardPlacedOn)
            }
        }
    }, [playerTurn, additionnalTurns])

    // Check if we should begin another round
    useEffect(function endRound() {
        if (playerHasPassed && enemyHasPassed) {
            if (rounds.length >= 3) {
                return
            }

            setRounds([...rounds, { playerPoints, enemyPoints }])

            // Put all cards from the battlefield into the discards
            setEnemyDiscard([...ENEMY_LINES.flatMap(line => battlefield[line]), ...enemyDiscard])
            setPlayerDiscard([...PLAYER_LINES.flatMap(line => battlefield[line]), ...playerDiscard])

            // Empty the battlefield
            setBattlefield({ ...EMPTY_BATTLEFIELD_ROWS })

            setWeatherCards([])
        }
    }, [playerHasPassed, enemyHasPassed])

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

    function getGameState(): GameState {
        return {
            playerHand,
            enemyHand,
            playerDeck,
            enemyDeck,
            playerDiscard,
            enemyDiscard,
            weatherCards,
            battlefield
        }
    }

    function setGameState(gameState: GameState) {
        setPlayerHand(gameState.playerHand)
        setEnemyHand(gameState.enemyHand)
        setPlayerDeck(gameState.playerDeck)
        setEnemyDeck(gameState.enemyDeck)
        setPlayerDiscard(gameState.playerDiscard)
        setEnemyDiscard(gameState.enemyDiscard)
        setWeatherCards(gameState.weatherCards)
        setBattlefield(getBattlefieldAfterModifiers(gameState.battlefield))
    }

    // Playing a card is independant from playing it on the board or activating a special card
    async function playCard(card: Card, fromPlayerPov: boolean = true, linePlacedOn?: BATTLEFIELD_LINE, cardPlacedOn?: PlacedCard) {

        console.info(fromPlayerPov ? 'Player' : 'Opponent', 'played', card.title)

        let [couldPlay, newGameState, cardsToPlayNext] = await getStateAfterPlayingCard(card, getGameState(), fromPlayerPov, linePlacedOn, cardPlacedOn, cardSelectorContext);

        if (!couldPlay) {
            console.info('Card', card.title, 'could not be played')

            endTurn([{ playedByPlayer: fromPlayerPov, mustPlayCard: null }])
            return
        }

        let newAdditionnalTurns: AdditionnalTurn[] = []

        if (not(isEmpty(cardsToPlayNext))) {
            newAdditionnalTurns = cardsToPlayNext.map((cardToPlayNext): AdditionnalTurn => ({
                playedByPlayer: fromPlayerPov,
                mustPlayCard: cardToPlayNext
            }))
        }

        setGameState(newGameState)

        endTurn(newAdditionnalTurns)
    }

    // When the player clicks on a line
    function battlefieldLineSelect(lineType: BATTLEFIELD_LINE, card: PlacedCard, selectedCard?: PlacedCard) {
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

        playCard(card, true, lineType, selectedCard)
    }

    function battlefieldSelect(lineType?: BATTLEFIELD_LINE, card?: PlacedCard) {
        // You can't play if you haven't selected a card
        if (!selectedCard) {
            return
        }

        if (notNil(lineType) && canBePlaced(selectedCard)) {
            if (notNil(card) && notNil(selectedCard.onCardPlayed)) {
                battlefieldLineSelect(lineType, selectedCard, card)
            } else {
                battlefieldLineSelect(lineType, selectedCard)
            }
        } else {
            playCard(selectedCard)
        }
    }

    // Unselect the card and play the next turn
    function endTurn(newAdditionnalTurns: AdditionnalTurn[] = []) {

        // We need to work with all the planned turns
        let additionnalTurnsPlusNewOnes = [...additionnalTurns, ...newAdditionnalTurns]

        if (isEmpty(additionnalTurnsPlusNewOnes)) {
            // By default we just make the other side play
            setSelectedCard(null)
            setLockPlayerHand(playerTurn)
            setTimeout(() => setPlayerTurn(!playerTurn), enemyFakeThinkingTime)
        } else {
            // If we have next turns specified, we play the next which is the first in the list
            let { mustPlayCard, playedByPlayer } = additionnalTurnsPlusNewOnes[0];
            setSelectedCard(mustPlayCard)
            setPlayerTurn(playedByPlayer)

            // The player can only choose a card on his turn or if the next round is allow changing cards
            setLockPlayerHand(!playedByPlayer || notNil(mustPlayCard))

            // We just set up the next turn so we remove it from the list (it was the first on)
            setAdditionnalTurns(tail(additionnalTurnsPlusNewOnes))
        }

        console.groupEnd()
        setTurns(add(1))
        console.group(`Turn ${turns + 1}`)
    }

    function pass() {
        if (playerTurn) {
            setPlayerHasPassed(true)
            setPlayerTurn(false)

            // FIXME : Ugly hack to make the enemy play 
            setAdditionnalTurns(Array(enemyHand.length * 2).fill({ playedByPlayer: false, mustPlayCard: null }))
        }
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

                    onCardClick={battlefieldSelect}
                    onLineClick={battlefieldSelect}
                    onBoardClick={battlefieldSelect}

                    cardsCanBeSelected={notNil(selectedCard) && canBePlaced(selectedCard) && !!selectedCard.canBePlacedOverACard}
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
                    canSelectCards={not(lockPlayerHand)}
                />
            </div>
            <div className={styles.decks}>
                <button onClick={() => pass()}>Pass</button>
                <div className={styles.deckLine}>
                    <DeckComponent
                        title="Enemy Deck"
                        cards={enemyDeck}
                    />
                    <DeckComponent
                        title="Enemy Discard"
                        cards={enemyDiscard}
                    />
                </div>
                <div className={styles.cardPreviewZone}>
                    <CardPreviewComponent card={selectedCard}></CardPreviewComponent>
                </div>
                <div className={styles.deckLine}>
                    <DeckComponent
                        title="Player Deck"
                        cards={playerDeck}
                    />
                    <DeckComponent
                        title="Player Discard"
                        cards={playerDiscard}
                    />
                </div>
            </div>
        </div>
    )
}