import { isNil, min } from 'ramda'
import {
    COMMANDERS_HORN_MODIFIER,
    MORALE_BOOST_MODIFIER,
    TIGHT_BOND_MODIFIER,
    WEATHER_MODIFIER,
} from '../../constants/modifiers'
import { mapOverBattlefield } from '../../helpers/battlefield'
import { getStrength, notHero } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { ModifierEffect } from '../../types/effects'

export const moraleBoostModifier: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('Morale Boost modifier from', self.title, 'on line', linePlacedOn)
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => {
                if (linePlacedOn == lineType && card.id != self.id && notHero(card)) {
                    return {
                        ...card,
                        strength: !!card.strength ? card.strength + 1 : card.originalStrength + 1,
                        appliedModifiers: [...(card.appliedModifiers ?? []), MORALE_BOOST_MODIFIER],
                    }
                } else {
                    return card
                }
            })
        } else {
            return line
        }
    })
}

export const tightBondModifier: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('Tight Bond modifier from', self.title, `(${self.id})`)
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => {
                if (card.id == self.id && notHero(card)) {
                    let howManyIdenticalCards = line.filter(c => c.title == self.title).length
                    return {
                        ...card,
                        strength: !!card.strength
                            ? card.strength * howManyIdenticalCards
                            : card.originalStrength * howManyIdenticalCards,
                        appliedModifiers:
                            howManyIdenticalCards > 1
                                ? [...(card.appliedModifiers ?? []), TIGHT_BOND_MODIFIER]
                                : card.appliedModifiers,
                    }
                } else {
                    return card
                }
            })
        } else {
            return line
        }
    })
}

export const weatherModifier: ModifierEffect = (self, _, battlefield) => {
    console.log('Weather modifier by', self.title)
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (notNil(self.authorizedLines) && self.authorizedLines.includes(lineType)) {
            return line.map(card =>
                notHero(card) &&
                (isNil(card.appliedModifiers) ||
                    !card.appliedModifiers.some(m => m.id != WEATHER_MODIFIER.id))
                    ? {
                          ...card,
                          strength: min(getStrength(card), 1),
                          appliedModifiers: [...(card.appliedModifiers ?? []), WEATHER_MODIFIER],
                      }
                    : card
            )
        } else {
            return line
        }
    })
}

export const commandersHornModifier: ModifierEffect = (_, linePlacedOn, battlefield) => {
    console.log('Horn modifier on line', linePlacedOn)
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card =>
                notHero(card) &&
                (isNil(card.appliedModifiers) ||
                    !card.appliedModifiers.some(m => m.id != COMMANDERS_HORN_MODIFIER.id))
                    ? {
                          ...card,
                          strength: getStrength(card) * 2,
                          appliedModifiers: [...(card.appliedModifiers ?? []), COMMANDERS_HORN_MODIFIER],
                      }
                    : card
            )
        } else {
            return line
        }
    })
}
