import { isEmpty, isNil, not, without } from 'ramda'
import { CARD_TYPE } from '../../constants/constants'
import { mapOverBattlefield } from '../../helpers/battlefield'
import { canBePlaced, getStrength, notHero } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { PlacedCard } from '../../types/card'
import { SpecialEffect } from '../../types/effects'
import { GameState } from '../../types/game-state'
import { weatherModifier } from './modifiers'

export const medicEffect: SpecialEffect = async (_, state, __, ___, cardSelector) => {
    console.log('medic effect')

    if (isNil(cardSelector) || isEmpty(state.playerDiscard)) {
        return [state, []]
    }

    // We display the 10 first cards from the discard that are not heroes or special cards
    cardSelector.setCardList(state.playerDiscard.filter(c => c.type == CARD_TYPE.PLACED).filter(notHero).slice(0, 10))
    cardSelector.setMaxCardSelected(1)

    let selectedCards = await cardSelector.show()

    let newDiscard = without(selectedCards, state.playerDiscard)

    let newState: GameState = { ...state, playerDiscard: newDiscard }

    return [newState, selectedCards]
}

export const clearWeatherEffect: SpecialEffect = async (_, state) => {
    console.log('Clear Weather effect')

    let battlefield = mapOverBattlefield(state.battlefield, line =>
        line.filter(card => isNil(card.modifier) || card.modifier.effect != weatherModifier)
    )

    return { ...state, battlefield, weatherCards: [] }
}

export const weatherEffect: SpecialEffect = async (self, state) => {
    console.log('Weather effect')
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
    console.log('Spy effect')
    let drawnCards = state.playerDeck.splice(0, 2)
    let newState = { ...state, playerHand: [...state.playerHand, ...drawnCards] }
    return newState
}

export const decoyEffect: SpecialEffect = async (_, state, linePlacedOn, cardPlacedOn) => {
    console.log('Decoy effect')
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

export const scorchEffect: SpecialEffect = async (_, state) => {
    console.log('Scorch effect')
    let cardsStrength = Object.values(state.battlefield).flatMap(line =>
        line.filter(notHero).map(getStrength)
    )
    let maxStrength = Math.max(...cardsStrength)

    let allRemovedCards: PlacedCard[] = []

    let scorchedBoard = mapOverBattlefield(state.battlefield, line => {
        let removedCards = line.filter(card => notHero(card) && getStrength(card) >= maxStrength)
        allRemovedCards = [...allRemovedCards, ...removedCards]
        return line.filter(card => not(removedCards.includes(card)))
    })

    state.battlefield = scorchedBoard
    state.playerDiscard = [...allRemovedCards, ...state.playerDiscard]
    return state
}
