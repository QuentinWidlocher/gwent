import { mapOverBattlefield } from '../../helpers/battlefield'
import { ModifierEffect } from '../../types/effects'

export const moraleBoostEffect: ModifierEffect = (self, linePlacedOn, battlefield) => {
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

export const tightBondEffect: ModifierEffect = (self, linePlacedOn, battlefield) => {
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

export const weatherEffect: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('weather effect')
    return battlefield
}

export const commandersHornEffect: ModifierEffect = (self, linePlacedOn, battlefield) => {
    console.log('horn effect')
    return battlefield
}
