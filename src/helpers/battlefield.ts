import { range } from 'ramda'
import { BATTLEFIELD_LINE, EMPTY_BATTLEFIELD_ROWS } from '../constants/constants'
import { BattlefieldLine, BattlefieldRows } from '../types/aliases'
import { enumKeys } from './helpers'

export function mapOverBattlefield(
    battlefield: BattlefieldRows,
    fn: (line: BattlefieldLine, lineType: BATTLEFIELD_LINE, battlefield: BattlefieldRows) => BattlefieldLine
) {
    let newBattlefield = { ...EMPTY_BATTLEFIELD_ROWS }

    for (let lineType of enumKeys(BATTLEFIELD_LINE)) {
        let line = battlefield[lineType]
        newBattlefield[lineType] = fn(line, lineType as BATTLEFIELD_LINE, battlefield)
    }

    return newBattlefield
}
