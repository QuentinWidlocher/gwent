import { mapOverBattlefield } from '../../helpers/battlefield'
import { getStrength, notHero } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { ModifierEffect } from '../../types/effects'

export const moraleBoostModifier: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('Morale Boost modifier')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => {
                if (linePlacedOn == lineType && card.id != self.id && notHero(card)) {
                    return {
                        ...card,
                        strength: !!card.strength ? card.strength + 1 : card.originalStrength + 1,
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
    console.log('Tight Bond modifier')
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
    console.log('Weather modifier')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (notNil(self.authorizedLines) && self.authorizedLines.includes(lineType)) {
            return line.map(card => (notHero(card) ? { ...card, strength: 1 } : card))
        } else {
            return line
        }
    })
}

export const commandersHornModifier: ModifierEffect = (_, linePlacedOn, battlefield) => {
    console.log('Horn modifier')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => (notHero(card) ? { ...card, strength: getStrength(card) * 2 } : card))
        } else {
            return line
        }
    })
}
