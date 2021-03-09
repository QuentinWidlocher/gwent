import { isNil, sum } from 'ramda'
import { CardSelectorContextProps } from '../components/Board/CardSelector/CardSelector'
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, LINES_NAME, PLAYER_LINES } from '../constants/constants'
import { mapBattlefield, mapOverBattlefield, swapLinePov, swapPov } from '../helpers/battlefield'
import { canBePlaced, getStrength } from '../helpers/cards'
import { removeCardFromHand } from '../helpers/hand'
import { notNil } from '../helpers/helpers'
import { Battlefield } from '../types/aliases'
import { Card, Modifier, PlacedCard } from '../types/card'
import { GameState } from '../types/game-state'

// Take a battlefield and return another one with all card modifiers applied
export function getBattlefieldAfterModifiers(battlefield: Battlefield): Battlefield {
    // We get a list of all the modifiers info from the battlefield
    let modifiers: [Modifier, PlacedCard, BATTLEFIELD_LINE][] = mapBattlefield(
        battlefield, // We iterate over the battlefield
        (
            line,
            lineType // for each lines
        ) =>
            line
                .filter(card => notNil(card.modifier)) // We only focus on modifiers
                .map(card => [card.modifier, card, lineType] as [Modifier, PlacedCard, BATTLEFIELD_LINE]) // and we extract info
    ).flat()

    // We sort the modifier starting from 0 to n
    let sortedModifiers = modifiers.sort(([m]) => m.priority).reverse()

    // We give all cards their original strength and we remove their modifiers
    let resetBattlefied = mapOverBattlefield(battlefield, line =>
        line.map(card => ({
            ...card,
            strength: card.originalStrength,
            appliedModifiers: [],
        }))
    )

    console.groupCollapsed('Modifiers')

    // For each modifier, we provide its function the entire battlefield (curField) and the line where the card was placed
    // and we get back the modified battlefield. We then provide this modified battlefield to the next modifier
    // and so on... The result is the battlefield modified by each modifier
    let newBattlefield = sortedModifiers.reduce(
        (curField, [modifier, card, line]) => modifier.effect(card, line, curField),
        resetBattlefied
    )

    console.groupEnd()

    return newBattlefield
}

// Actively play a card if possible, apply the effects if any and return :
// Boolean : If the card was played
// GameState : The updated game state
// Card[] : A list of card to play after this turn
export async function getStateAfterPlayingCard(
    card: Card,
    currentGameState: GameState,
    fromPlayerPov: boolean = true,
    linePlacedOn?: BATTLEFIELD_LINE,
    cardPlacedOn?: PlacedCard,
    cardSelectorContext?: CardSelectorContextProps
): Promise<[couldPlay: Boolean, newState: GameState, cardsToPlayNext: Card[]]> {
    // We make sure that whoever is playing, his side is the player side
    // Example, if the opponent is playing, the effect is viewed from his perspective so playerDeck is
    // really the opponnent's deck
    let gameState: GameState = fromPlayerPov ? currentGameState : swapPov(currentGameState)
    let linePlacedOnFromPov = fromPlayerPov || isNil(linePlacedOn) ? linePlacedOn : swapLinePov(linePlacedOn)
    let cardsToPlayNext: Card[] = []

    gameState.playerHand = removeCardFromHand(card, gameState.playerHand)

    // If the card has a special condition to be played and it fails, we return empty infos and a false to indicate failure
    if (notNil(card.canBePlayed) && !card.canBePlayed(card, gameState, linePlacedOnFromPov)) {
        return [false, currentGameState, cardsToPlayNext]
    }

    // If the card can be played on a line, we add it
    if (notNil(linePlacedOnFromPov) && canBePlaced(card)) {
        let rowsWithCard: Battlefield = { ...gameState.battlefield }
        rowsWithCard[linePlacedOnFromPov].push(card)
        gameState.battlefield = rowsWithCard
    }

    // We update the game state if the card has an effect
    if (notNil(card.onCardPlayed)) {
        // This can be the new game state, or a gamestate with a list of cards to play (example: medic effect)
        let infos = await card.onCardPlayed(
            card,
            gameState,
            linePlacedOnFromPov,
            cardPlacedOn,
            fromPlayerPov ? cardSelectorContext : undefined
        )

        if (Array.isArray(infos)) {
            ;[gameState, cardsToPlayNext] = infos
        } else {
            gameState = infos
        }
    }

    // We swap the point of view again
    return [true, fromPlayerPov ? gameState : swapPov(gameState), cardsToPlayNext]
}

export type PlayInfo = [
    cardToPlay: Card,
    selectedLine: BATTLEFIELD_LINE | undefined,
    selectedCard: PlacedCard | undefined
]

export function autoPlay(currentGameState: GameState, fromPlayerPov: boolean = false): PlayInfo {
    let gameState: GameState = fromPlayerPov ? currentGameState : swapPov(currentGameState)

    // Select a random card from his hand
    let selectedCard = gameState.playerHand[Math.floor(Math.random() * gameState.playerHand.length)]

    return autoPlayCard(selectedCard, fromPlayerPov)
}

export function autoPlayCard(selectedCard: Card, fromPlayerPov: boolean = false): PlayInfo {
    // Place it on the battlefield or play the effect
    if (canBePlaced(selectedCard)) {
        // Find all line where the card can naturally go
        let availableLines: BATTLEFIELD_LINE[] = []

        if (notNil(selectedCard.authorizedLines)) {
            availableLines = selectedCard.authorizedLines
        } else {
            availableLines = selectedCard.unitTypes
                .flatMap(type => CARD_AUTHORIZED_LINES[type])
                .filter(line => PLAYER_LINES.includes(line))
        }

        // Select a random line
        let selectedLine = availableLines[Math.floor(Math.random() * availableLines.length)]

        if (!fromPlayerPov) selectedLine = swapLinePov(selectedLine)

        return [selectedCard, selectedLine, undefined]
    } else {
        return [selectedCard, undefined, undefined]
    }
}

export function shouldEnemyPassTheTurn(
    playerPoints: number,
    enemyPoints: number,
    playerHasPassed: boolean,
    lastTurn: boolean,
    gameState: GameState
): boolean {
    // No points in surrending the last turn if the player is stil playing
    if (lastTurn && !playerHasPassed) {
        return false
    }

    // If the player has surrendered and we are leading, we stop here
    if (playerHasPassed && playerPoints < enemyPoints) {
        return true
    }

    let playerHandStrength = sum(gameState.playerHand.filter(canBePlaced).map(getStrength))
    let enemyHandStrength = sum(gameState.enemyHand.filter(canBePlaced).map(getStrength))
    let totalPlacedCards = sum(mapBattlefield(gameState.battlefield, l => l.length))

    if (
        totalPlacedCards >= 4 && // If the game last a little bit
        playerPoints > enemyPoints && // Player has more points
        playerHandStrength < enemyHandStrength && // but a worse hand
        Math.random() < 0.5
    ) {
        // The enemy should surrender this turn to have the advantage the next turn
        return true
    }

    return false
}
