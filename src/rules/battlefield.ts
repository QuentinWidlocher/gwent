import { BATTLEFIELD_LINE } from '../constants/constants'
import { mapBattlefield, mapOverBattlefield } from '../helpers/battlefield'
import { notNil } from '../helpers/helpers'
import { Battlefield } from '../types/aliases'
import { Modifier, PlacedCard } from '../types/card'
import { GameState } from '../types/game-state'

// Compute how many lines are worth taking in account the card modifiers
export function computeBattlefieldPoints(battlefield: Battlefield): Battlefield {
    let modifiers: [Modifier, PlacedCard, BATTLEFIELD_LINE][] = mapBattlefield(
        battlefield,
        (line, lineType) =>
            line
                .filter(card => notNil(card.modifier))
                .map(card => [card.modifier, card, lineType] as [Modifier, PlacedCard, BATTLEFIELD_LINE])
    ).flat()

    // We sort the modifier starting from 0 to n
    let sortedModifiers = modifiers.sort(([m]) => m.priority).reverse()

    let resetBattlefied = mapOverBattlefield(battlefield, line =>
        line.map(card => ({ ...card, strength: card.originalStrength }))
    )

    // For each modifier, we provide its function the entire battlefield and the line where the card was placed
    // and we get back the modified battlefield. We then provide this modified battlefield to the next modifier
    // and so on... The result is the battlefield modified by each modifier
    let newBattlefield = sortedModifiers.reduce(
        (curField, [m, c, l]) => m.effect(c, l, curField),
        resetBattlefied
    )

    return newBattlefield
}