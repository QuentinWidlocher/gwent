import { isEmpty, isNil, not, without } from 'ramda'
import { CARD_TYPE, PLAYER_LINES } from '../../constants/constants'
import { mapOverBattlefield } from '../../helpers/battlefield'
import { canBePlaced, getStrength, notHero } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { Card, PlacedCard } from '../../types/card'
import { SpecialEffect } from '../../types/effects'
import { GameState } from '../../types/game-state'
import { weatherModifier } from './modifiers'

export const medicEffect: SpecialEffect = async (_, state, __, ___, cardSelector) => {
    if (isNil(cardSelector) || isEmpty(state.playerDiscard)) {
        return [state, []]
    }

    // We display the 10 first cards from the discard that are not heroes or special cards
    cardSelector.setCardList(
        state.playerDiscard
            .filter(c => c.type == CARD_TYPE.PLACED)
            .filter(notHero)
            .slice(0, 10)
    )
    cardSelector.setMaxCardSelected(1)

    let selectedCards = await cardSelector.show()

    console.debug('Selected card', selectedCards)

    let newDiscard = without(selectedCards, state.playerDiscard)

    let newState: GameState = { ...state, playerDiscard: newDiscard }

    return [newState, selectedCards]
}

export const clearWeatherEffect: SpecialEffect = async (_, state) => {
    let battlefield = mapOverBattlefield(state.battlefield, line =>
        line.filter(card => isNil(card.modifier) || card.modifier.effect != weatherModifier)
    )

    return { ...state, battlefield, weatherCards: [] }
}

export const weatherEffect: SpecialEffect = async (self, state) => {
    // Place the card in the weather box
    if (canBePlaced(self)) {
        return { ...state, weatherCards: [...state.weatherCards, self] }
    } else {
        return state
    }
}

export const musterEffect: SpecialEffect = async (self, state) => {
    console.log('Muster effect')

    while (state.playerDeck.some(card => card.title == self.title)) {
        let index = state.playerDeck.findIndex(card => card.title == self.title)
        state.playerHand.push(state.playerDeck[index])
        state.playerDeck.splice(index, 1)
    }

    return state
}
export const spyEffect: SpecialEffect = async (_, state) => {
    let drawnCards = state.playerDeck.splice(0, 2)
    console.debug('Drawn cards', drawnCards)
    let newState = { ...state, playerHand: [...state.playerHand, ...drawnCards] }
    return newState
}

export const decoyEffect: SpecialEffect = async (_, state, linePlacedOn, cardPlacedOn) => {
    console.debug('Decoy replaced', cardPlacedOn?.title)
    if (notNil(linePlacedOn) && notNil(cardPlacedOn)) {
        let battlefieldWithSwappedCards = mapOverBattlefield(state.battlefield, (line, lineType) => {
            if (lineType == linePlacedOn) {
                return line.filter(card => card.id != cardPlacedOn.id)
            } else {
                return line
            }
        })
        return {
            ...state,
            playerHand: [...state.playerHand, cardPlacedOn],
            battlefield: battlefieldWithSwappedCards,
        }
    } else {
        return state
    }
}

export const scorchEffect: SpecialEffect = async (self, state) => {
    const notSelf = (card: Card) => card.id != self.id

    let cardsStrength = Object.values(state.battlefield).flatMap(line =>
        line.filter(notHero).map(getStrength)
    )
    let maxStrength = Math.max(...cardsStrength)

    let allRemovedPlayerCards: PlacedCard[] = []
    let allRemovedEnemyCards: PlacedCard[] = []

    let scorchedBoard = mapOverBattlefield(state.battlefield, (line, lineType) => {
        // We use >= here to be safe but the strength should not be greater thant the maxStrength
        let removedCards = line.filter(
            card => notSelf(card) && notHero(card) && getStrength(card) >= maxStrength
        )

        if (PLAYER_LINES.includes(lineType)) {
            allRemovedPlayerCards = [...allRemovedPlayerCards, ...removedCards]
        } else {
            allRemovedEnemyCards = [...allRemovedEnemyCards, ...removedCards]
        }

        return line.filter(card => not(removedCards.includes(card)))
    })

    console.group('Scorched Cards')
    console.debug('Player side (relative)', allRemovedPlayerCards)
    console.debug('Enemy side (relative)', allRemovedEnemyCards)
    console.groupEnd()

    state.battlefield = scorchedBoard
    state.playerDiscard = [...allRemovedPlayerCards, ...state.playerDiscard]
    state.enemyDiscard = [...allRemovedEnemyCards, ...state.enemyDiscard]
    return state
}
