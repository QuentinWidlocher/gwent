import { CardSelectorContextProps } from '../components/Board/CardSelector/CardSelector'
import { BATTLEFIELD_LINE, CARD_AUTHORIZED_LINES, ENEMY_LINES, PLAYER_LINES } from '../constants/constants'
import { mapBattlefield, mapOverBattlefield, swapPov } from '../helpers/battlefield'
import { canBePlaced, lineFromEnemyPerspective } from '../helpers/cards'
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
        (line, lineType) => // for each lines
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

    // For each modifier, we provide its function the entire battlefield (curField) and the line where the card was placed
    // and we get back the modified battlefield. We then provide this modified battlefield to the next modifier
    // and so on... The result is the battlefield modified by each modifier
    let newBattlefield = sortedModifiers.reduce(
        (curField, [modifier, card, line]) => modifier.effect(card, line, curField),
        resetBattlefied
    )

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
): Promise<[Boolean, GameState, Card[]]> {

    // We make sure that whoever is playing, his side is the player side
    // Example, if the opponent is playing, the effect is viewed from his perspective so playerDeck is
    // really the opponnent's deck
    let gameState: GameState = fromPlayerPov ? currentGameState : swapPov(currentGameState)
    let cardsToPlayNext: Card[] = []

    gameState.playerHand = removeCardFromHand(card, currentGameState.playerHand)

    // If the card has a special condition to be played and it fails, we return empty infos and a false to indicate failure
    if (notNil(card.canBePlayed) && !card.canBePlayed(card, gameState, linePlacedOn)) {
        return [false, currentGameState, cardsToPlayNext]
    }

    // If the card can be played on a line, we add it
    if (notNil(linePlacedOn) && canBePlaced(card)) {
        let rowsWithCard: Battlefield = { ...currentGameState.battlefield }
        rowsWithCard[linePlacedOn].push(card)
        gameState.battlefield = rowsWithCard
    }

    // We update the game state if the card has an effect
    if (notNil(card.onCardPlayed)) {
        // This can be the new game state, or a gamestate with a list of cards to play (example: medic effect)
        let infos = await card.onCardPlayed(card, gameState, linePlacedOn, cardPlacedOn, (fromPlayerPov ? cardSelectorContext : undefined))

        if (Array.isArray(infos)) {
            [gameState, cardsToPlayNext] = infos
        } else {
            gameState = infos
        }
    }

    // We swap the point of view again
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
