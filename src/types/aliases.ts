import { PlacedCard } from './card'
import { BATTLEFIELD_LINE } from '../constants/constants'

export type Battlefield = Record<BATTLEFIELD_LINE, PlacedCard[]>
export type BattlefieldLine = PlacedCard[]
export type Enumeration = { [key: number]: string }
