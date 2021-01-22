import { mapOverBattlefield } from '../../helpers/battlefield'
import { getStrength } from '../../helpers/cards'
import { SpecialEffect } from '../../types/effects'

export const medicEffect: SpecialEffect = (self, state) => {
    console.log('medic effect')
    return state
}

export const clearWeatherEffect: SpecialEffect = (self, state) => {
    console.log('clear weather effect')
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
    let cardsStrength = Object.values(state.board).flatMap(line => line.map(getStrength))
    let maxStrength = Math.max(...cardsStrength)

    let scorchedBoard = mapOverBattlefield(state.board, line =>
        line.filter(card => getStrength(card) < maxStrength)
    )

    state.board = scorchedBoard
    return state
}
