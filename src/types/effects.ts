import { BATTLEFIELD_LINE } from '../constants/constants'
import { Battlefield } from './aliases'
import { Card, PlacedCard } from './card'
import { GameState } from './game-state'

export type ModifierEffect = (
    self: PlacedCard,
    linePlacedOn: BATTLEFIELD_LINE,
    battlefield: Battlefield
) => Battlefield

export type SpecialEffect = (self: Card, state: GameState) => GameState
