import { isNil } from 'ramda'
import { mapOverBattlefield } from '../../helpers/battlefield'
import { cardIsModifier, cardIsPlaced, getStrength } from '../../helpers/cards'
import { SpecialEffect } from '../../types/effects'
import { weatherModifier } from './modifiers'

export const medicEffect: SpecialEffect = (self, state) => {
    console.log('medic effect')
    return state
}

export const clearWeatherEffect: SpecialEffect = (self, state) => {
    console.log('clear weather effect')

    let battlefieldWithoutWeather = mapOverBattlefield(state.battlefield, line =>
        line.filter(card => isNil(card.modifier) || card.modifier.effect != weatherModifier)
    )

    return { ...state, battlefield: battlefieldWithoutWeather }
}

// TODO: duplicate the card to the other side
export const weatherEffect: SpecialEffect = (self, state) => {
    console.log('weather effect')
    return state
}

export const musterEffect: SpecialEffect = (self, state) => {
    console.log('muster effect')

    while (state.playerDeck.some(card => card.title == self.title)) {
        let index = state.playerDeck.findIndex(card => card.title == self.title)
        state.playerHand.push(state.playerDeck[index])
        state.playerDeck.splice(index, 1)
    }

    return state
}
export const spyEffect: SpecialEffect = (self, state) => {
    console.log('spy effect')
    return state
}

export const decoyEffect: SpecialEffect = (self, state) => {
    console.log('decoy effect')
    return state
}
export const scorchEffect: SpecialEffect = (_, state) => {
    console.log('scorch effect')
    let cardsStrength = Object.values(state.battlefield).flatMap(line => line.map(getStrength))
    let maxStrength = Math.max(...cardsStrength)

    let scorchedBoard = mapOverBattlefield(state.battlefield, line =>
        line.filter(card => getStrength(card) < maxStrength)
    )

    state.battlefield = scorchedBoard
    return state
}
