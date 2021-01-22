import { range } from 'ramda'
import { BATTLEFIELD_LINE, EMPTY_BATTLEFIELD_ROWS } from '../constants/constants'
import { BattlefieldLine, BattlefieldRows, Enumeration } from '../types/aliases'
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

// Looks like shit, doesn't work, but may be useful sometime ?
// TODO: Delete or use properly
// export function mapOverEnumRecord<E extends Enumeration, V extends E[keyof E]>(
//     record: Record<keyof E, V>,
//     enumeration: E,
//     fn: (item: V, enumVal: keyof E, record: Record<keyof E, V>) => V
// ) {
//     let result = {} as E

//     for (let enumKey of enumKeys(enumeration)) {
//         let item = record[enumKey]
//         result[enumKey] = fn(item, enumKey, record)
//     }

//     return result
// }
