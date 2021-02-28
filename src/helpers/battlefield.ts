import { clone, equals, sum } from 'ramda'
import { BATTLEFIELD_LINE, EMPTY_BATTLEFIELD_ROWS } from '../constants/constants'
import { Battlefield, BattlefieldLine } from '../types/aliases'
import { GameState } from '../types/game-state'
import { cardIsPlaced, getStrength } from './cards'
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
        newBattlefield[swapLinePov(lineType as BATTLEFIELD_LINE)] = battlefield[lineType]
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
    return {
        playerHand: [...gameState.enemyHand],
        enemyHand: [...gameState.playerHand],
        playerDeck: [...gameState.enemyDeck],
        enemyDeck: [...gameState.playerDeck],
        playerDiscard: [...gameState.enemyDiscard],
        enemyDiscard: [...gameState.playerDiscard],
        weatherCards: [...gameState.weatherCards],
        battlefield: {
            [BATTLEFIELD_LINE.ENEMY_SIEGE]: [...gameState.battlefield.PLAYER_SIEGE],
            [BATTLEFIELD_LINE.ENEMY_RANGED]: [...gameState.battlefield.PLAYER_RANGED],
            [BATTLEFIELD_LINE.ENEMY_MELEE]: [...gameState.battlefield.PLAYER_MELEE],
            [BATTLEFIELD_LINE.PLAYER_MELEE]: [...gameState.battlefield.ENEMY_MELEE],
            [BATTLEFIELD_LINE.PLAYER_RANGED]: [...gameState.battlefield.ENEMY_RANGED],
            [BATTLEFIELD_LINE.PLAYER_SIEGE]: [...gameState.battlefield.ENEMY_SIEGE],
        },
    }
}

export function swapLinePov(lineFromPlayerPerspective: BATTLEFIELD_LINE): BATTLEFIELD_LINE {
    let fromPlayerPerspective = [
        BATTLEFIELD_LINE.ENEMY_SIEGE,
        BATTLEFIELD_LINE.ENEMY_RANGED,
        BATTLEFIELD_LINE.ENEMY_MELEE,
        BATTLEFIELD_LINE.PLAYER_MELEE,
        BATTLEFIELD_LINE.PLAYER_RANGED,
        BATTLEFIELD_LINE.PLAYER_SIEGE,
    ]

    let fromEnemyPerspective = [
        BATTLEFIELD_LINE.PLAYER_SIEGE,
        BATTLEFIELD_LINE.PLAYER_RANGED,
        BATTLEFIELD_LINE.PLAYER_MELEE,
        BATTLEFIELD_LINE.ENEMY_MELEE,
        BATTLEFIELD_LINE.ENEMY_RANGED,
        BATTLEFIELD_LINE.ENEMY_SIEGE,
    ]

    return fromEnemyPerspective[fromPlayerPerspective.findIndex(equals(lineFromPlayerPerspective))]
}
