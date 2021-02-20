import { isNil } from 'ramda'
import { mapOverBattlefield } from '../../helpers/battlefield'
import { canBePlaced, getStrength, isHero, notHero } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { SpecialEffect } from '../../types/effects'
import { weatherModifier } from './modifiers'

export const medicEffect: SpecialEffect = async (self, state) => {
    console.log('medic effect')

    return state
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

// TODO: send to discard instead
export const scorchEffect: SpecialEffect = async (_, state) => {
    console.log('Scorch effect')
    let cardsStrength = Object.values(state.battlefield).flatMap(line =>
        line.filter(notHero).map(getStrength)
    )
    let maxStrength = Math.max(...cardsStrength)

    let scorchedBoard = mapOverBattlefield(state.battlefield, line =>
        line.filter(card => isHero(card) || getStrength(card) < maxStrength)
    )

    state.battlefield = scorchedBoard
    return state
}
