import { ModifierEffect } from '../../types/effects'

export const moraleBoostEffect: ModifierEffect = (self, line) => {
    console.log('morale boost effect')
    return line.map(card => {
        if (card != self) {
            return {
                ...card,
                strength: !!card.strength ? card.strength + 1 : card.originalStrength + 1,
            }
        } else {
            return card
        }
    })
}

export const tightBondEffect: ModifierEffect = (self, line) => {
    console.log('tight bond effect')
    return line.map(card => {
        if (card == self) {
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
}

export const weatherEffect: ModifierEffect = (self, line) => {
    console.log('weather effect')
    return line
}

export const commandersHornEffect: ModifierEffect = (self, line) => {
    console.log('horn effect')
    return line
}
