import { PlacedCard } from './card'
import { BATTLEFIELD_LINE } from '../constants/constants'

export type BattlefieldRows = Record<BATTLEFIELD_LINE, PlacedCard[]>
export type BattlefieldLine = PlacedCard[]
