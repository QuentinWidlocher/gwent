import { BATTLEFIELD_LINE, CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from '../constants/constants'
import { ModifierEffect } from './effects'
import { GameState } from './game-state'

export type Modifier = {
    priority: number
    effect: ModifierEffect
}

export type BaseCard = {
    type: CARD_TYPE
    title: string
    id: string
    deckType: DECK_TYPE
    onCardPlayed?: (self: Card, state: GameState) => GameState
    modifyPoints?: Modifier
}

export type PlacedCard = BaseCard & {
    unitTypes: PLACED_CARD_TYPE[]
    originalStrength: number
    strength?: number
    canBePlacedOverACard?: boolean
    authorizedLines?: BATTLEFIELD_LINE[]
}

export type Card = BaseCard | PlacedCard

export type CardWithoutId = Omit<BaseCard, 'id'> | Omit<PlacedCard, 'id'>
