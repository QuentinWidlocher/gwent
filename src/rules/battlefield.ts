import { BATTLEFIELD_LINE } from '../constants/constants'
import { mapBattlefield, mapOverBattlefield, swapPov } from '../helpers/battlefield'
import { canBePlaced } from '../helpers/cards'
import { removeCardFromHand } from '../helpers/hand'
import { notNil } from '../helpers/helpers'
import { Battlefield } from '../types/aliases'
import { Card, Modifier, PlacedCard } from '../types/card'
import { GameState } from '../types/game-state'

// Compute how many lines are worth taking in account the card modifiers
export function computeBattlefieldPoints(battlefield: Battlefield): Battlefield {
    let modifiers: [Modifier, PlacedCard, BATTLEFIELD_LINE][] = mapBattlefield(
        battlefield,
        (line, lineType) =>
            line
                .filter(card => notNil(card.modifier))
                .map(card => [card.modifier, card, lineType] as [Modifier, PlacedCard, BATTLEFIELD_LINE])
    ).flat()

    // We sort the modifier starting from 0 to n
    let sortedModifiers = modifiers.sort(([m]) => m.priority).reverse()

    let resetBattlefied = mapOverBattlefield(battlefield, line =>
        line.map(card => ({
            ...card,
            strength: card.originalStrength,
            appliedModifiers: [],
        }))
    )

    // For each modifier, we provide its function the entire battlefield and the line where the card was placed
    // and we get back the modified battlefield. We then provide this modified battlefield to the next modifier
    // and so on... The result is the battlefield modified by each modifier
    let newBattlefield = sortedModifiers.reduce(
        (curField, [modifier, card, line]) => modifier.effect(card, line, curField),
        resetBattlefied
    )

    console.debug(
        'newBattlefield[BATTLEFIELD_LINE.PLAYER_MELEE]',
        newBattlefield[BATTLEFIELD_LINE.PLAYER_MELEE]
    )

    return newBattlefield
}

// Playing a card is independant from playing it on the board or activating a special card
export function getStateAfterPlayingCard(
    card: Card,
    currentGameState: GameState,
    fromPlayerPov: boolean = true,
    linePlacedOn?: BATTLEFIELD_LINE
): [Boolean, GameState] {
    let gameState: GameState = fromPlayerPov ? currentGameState : swapPov(currentGameState)

    let handWithoutCard = removeCardFromHand(
        card,
        fromPlayerPov ? currentGameState.playerHand : currentGameState.enemyHand
    )

    gameState.playerHand = handWithoutCard

    if (notNil(card.canBePlayed) && !card.canBePlayed(card, gameState, linePlacedOn)) {
        return [false, currentGameState]
    }

    if (notNil(linePlacedOn) && canBePlaced(card)) {
        let rowsWithCard: Battlefield = { ...currentGameState.battlefield }
        rowsWithCard[linePlacedOn].push(card)
        gameState.battlefield = rowsWithCard
    }

    // We update the game state if the card has an effect
    if (notNil(card.onCardPlayed)) {
        gameState = card.onCardPlayed(card, gameState)
    }

    return [true, fromPlayerPov ? gameState : swapPov(gameState)]
}
