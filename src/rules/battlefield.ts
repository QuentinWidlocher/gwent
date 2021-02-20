import { CardSelectorContextProps } from '../components/Board/CardSelector/CardSelector'
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, ENEMY_LINES, PLAYER_LINES } from '../constants/constants'
import { mapBattlefield, mapOverBattlefield, swapPov } from '../helpers/battlefield'
import { canBePlaced, lineFromEnemyPerspective } from '../helpers/cards'
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

    return newBattlefield
}

// Playing a card is independant from playing it on the board or activating a special card
export async function getStateAfterPlayingCard(
    card: Card,
    currentGameState: GameState,
    fromPlayerPov: boolean = true,
    linePlacedOn?: BATTLEFIELD_LINE,
    cardPlacedOn?: PlacedCard,
    cardSelectorContext?: CardSelectorContextProps
): Promise<[Boolean, GameState, Card[]]> {
    let gameState: GameState = fromPlayerPov ? currentGameState : swapPov(currentGameState)
    let cardsToPlayNext: Card[] = []

    let handWithoutCard = removeCardFromHand(
        card,
        fromPlayerPov ? currentGameState.playerHand : currentGameState.enemyHand
    )

    gameState.playerHand = handWithoutCard

    // If the card has a special condition to be played and it fails, we return empty infos and a false to indicate failure
    if (notNil(card.canBePlayed) && !card.canBePlayed(card, gameState, linePlacedOn)) {
        return [false, currentGameState, cardsToPlayNext]
    }

    if (notNil(linePlacedOn) && canBePlaced(card)) {
        let rowsWithCard: Battlefield = { ...currentGameState.battlefield }
        rowsWithCard[linePlacedOn].push(card)
        gameState.battlefield = rowsWithCard
    }

    // We update the game state if the card has an effect
    if (notNil(card.onCardPlayed)) {
        let infos = await card.onCardPlayed(card, gameState, linePlacedOn, cardPlacedOn, cardSelectorContext)

        if (Array.isArray(infos)) {
            ;[gameState, cardsToPlayNext] = infos
        } else {
            gameState = infos
        }
    }

    return [true, fromPlayerPov ? gameState : swapPov(gameState), cardsToPlayNext]
}

export function autoPlay(
    currentGameState: GameState,
    fromPlayerPov: boolean = false
): [Card, BATTLEFIELD_LINE | undefined, PlacedCard | undefined] {
    let gameState: GameState = fromPlayerPov ? currentGameState : swapPov(currentGameState)
    let ownLines: BATTLEFIELD_LINE[] = fromPlayerPov ? PLAYER_LINES : ENEMY_LINES

    // Select a random card from his hand
    let selectedCard = gameState.playerHand[Math.floor(Math.random() * gameState.playerHand.length)]

    return autoPlayCard(selectedCard, ownLines)
}

export function autoPlayCard(
    selectedCard: Card,
    ownLines: BATTLEFIELD_LINE[]
): [Card, BATTLEFIELD_LINE | undefined, PlacedCard | undefined] {
    // Place it on the battlefield or play the effect
    if (canBePlaced(selectedCard)) {
        // Find all line where the card can naturally go
        let availableLines = selectedCard.unitTypes
            .flatMap(type => CARD_AUTHORIZED_LINES[type])
            .filter(line => ownLines.includes(line))

        if (notNil(selectedCard.authorizedLines)) {
            availableLines = selectedCard.authorizedLines.map(lineFromEnemyPerspective)
        }

        // Select a random line
        let selectedLine = availableLines[Math.floor(Math.random() * availableLines.length)]

        return [selectedCard, selectedLine, undefined]
    } else {
        return [selectedCard, undefined, undefined]
    }
}
