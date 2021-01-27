import { WEATHER_MODIFIER } from '../../constants/modifiers'
import { cardIsModifier } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { ConditionEffect } from '../../types/effects'

export const weatherCondition: ConditionEffect = (self, state) => {
    console.log('Weather condition')
    return !state.weatherCards.some(c => c.title == self.title)
}

export const modifierCondition: ConditionEffect = (_, state, linePlacedOn) => {
    console.log('modifier condition')
    return notNil(linePlacedOn)
        ? state.battlefield[linePlacedOn].filter(
              card => cardIsModifier(card) && card.modifier?.id != WEATHER_MODIFIER.id
          ).length <= 0
        : false
}
