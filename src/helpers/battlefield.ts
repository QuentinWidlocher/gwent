import { clone, sum } from 'ramda'
import { BATTLEFIELD_LINE, EMPTY_BATTLEFIELD_ROWS } from '../constants/constants'
import { Battlefield, BattlefieldLine } from '../types/aliases'
import { GameState } from '../types/game-state'
import { cardIsPlaced, getStrength, lineFromEnemyPerspective } from './cards'
import { enumKeys } from './helpers'

export function mapOverBattlefield(
    battlefield: Battlefield,
    fn: (line: BattlefieldLine, lineType: BATTLEFIELD_LINE, battlefield: Battlefield) => BattlefieldLine
) {
    let newBattlefield = clone(EMPTY_BATTLEFIELD_ROWS)

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

export function battlefieldFromEnemyPerspective(battlefield: Battlefield): Battlefield {
    let newBattlefield = clone(EMPTY_BATTLEFIELD_ROWS)

    for (let lineType of enumKeys(BATTLEFIELD_LINE)) {
        newBattlefield[lineFromEnemyPerspective(lineType as BATTLEFIELD_LINE)] = battlefield[lineType]
    }

    return newBattlefield
}

export function getLineStrength(line: BattlefieldLine) {
    return sum(line.filter(cardIsPlaced).map(getStrength))
}

// Sum the sums of all lines
export function getTotalStrength(battlefield: Battlefield, linesType: BATTLEFIELD_LINE[]) {
    return sum(linesType.flatMap(line => getLineStrength(battlefield[line])))
}

export function swapPov(gameState: GameState): GameState {
    let swappedGameState = { ...gameState }
    ;[swappedGameState.playerDeck, swappedGameState.enemyDeck] = [
        swappedGameState.enemyDeck,
        swappedGameState.playerDeck,
    ]
    ;[swappedGameState.playerDiscard, swappedGameState.enemyDiscard] = [
        swappedGameState.enemyDiscard,
        swappedGameState.playerDiscard,
    ]
    ;[swappedGameState.playerHand, swappedGameState.enemyHand] = [
        swappedGameState.enemyHand,
        swappedGameState.playerHand,
    ]
    return swappedGameState
}
