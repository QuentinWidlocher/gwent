import { BattlefieldLine } from './aliases'
import { PlacedCard, Card } from './card'
import { GameState } from './game-state'

export type ModifierEffect = (self: PlacedCard, line: BattlefieldLine) => BattlefieldLine

export type SpecialEffect = (self: Card, state: GameState) => GameState
