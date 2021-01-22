import { sum } from 'ramda'
import { BATTLEFIELD_LINE, EMPTY_BATTLEFIELD_ROWS } from '../constants/constants'
import { Battlefield, BattlefieldLine } from '../types/aliases'
import { getStrength } from './cards'
import { enumKeys } from './helpers'

export function mapOverBattlefield(
    battlefield: Battlefield,
    fn: (line: BattlefieldLine, lineType: BATTLEFIELD_LINE, battlefield: Battlefield) => BattlefieldLine
) {
    let newBattlefield = { ...EMPTY_BATTLEFIELD_ROWS }

    for (let lineType of enumKeys(BATTLEFIELD_LINE)) {
        let line = battlefield[lineType]
        newBattlefield[lineType] = fn(line, lineType as BATTLEFIELD_LINE, battlefield)
    }

    return newBattlefield
}

export function mapBattlefield<T extends any>(
    battlefield: Battlefield,
    fn: (line: BattlefieldLine, lineType: BATTLEFIELD_LINE, battlefield: Battlefield) => T
): T[] {
    let result = []

    for (let lineType of enumKeys(BATTLEFIELD_LINE)) {
        let line = battlefield[lineType]
        result.push(fn(line, lineType as BATTLEFIELD_LINE, battlefield))
    }

    return result
}

export function getLineStrength(line: BattlefieldLine) {
    return sum(line.map(getStrength))
}

// Sum the sums of all lines
export function getTotalStrength(battlefield: Battlefield, linesType: BATTLEFIELD_LINE[]) {
    return sum(linesType.flatMap(line => getLineStrength(battlefield[line])))
}
