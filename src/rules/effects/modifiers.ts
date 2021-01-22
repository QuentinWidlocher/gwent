import { mapOverBattlefield } from '../../helpers/battlefield'
import { getStrength } from '../../helpers/cards'
import { notNil } from '../../helpers/helpers'
import { ModifierEffect } from '../../types/effects'

export const moraleBoostModifier: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('morale boost effect')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => {
                if (linePlacedOn == lineType && card.id != self.id) {
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
    console.log('tight bond effect')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => {
                let howManyIdenticalCards = line.filter(c => c.title == self.title).length
                if (card.id == self.id) {
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
    console.log('weather effect')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (notNil(self.authorizedLines) && self.authorizedLines.includes(lineType)) {
            return line.map(card => ({ ...card, strength: 1 }))
        } else {
            return line
        }
    })
}

export const commandersHornModifier: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('horn effect')
    return mapOverBattlefield(battlefield, (line, lineType) => {
        if (lineType == linePlacedOn) {
            return line.map(card => ({ ...card, strength: getStrength(card) * 2 }))
        } else {
            return line
        }
    })
}
