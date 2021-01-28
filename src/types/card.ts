import { BATTLEFIELD_LINE, CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from '../constants/constants'
import { ConditionEffect, ModifierEffect, SpecialEffect } from './effects'

export type Modifier = {
    id: string
    positive: boolean
    priority: number
    effect: ModifierEffect
}

export type BaseCard = {
    type: CARD_TYPE
    title: string
    id: string
    deckType: DECK_TYPE
    appliedModifiers?: Modifier[]
    onCardPlayed?: SpecialEffect
    canBePlayed?: ConditionEffect
}

export type PlacedCard = BaseCard & {
    unitTypes: PLACED_CARD_TYPE[]
    isHero?: boolean
    originalStrength: number
    strength?: number
    canBePlacedOverACard?: boolean
    authorizedLines?: BATTLEFIELD_LINE[]
    modifier?: Modifier
}

export type Card = BaseCard | PlacedCard

export type CardWithoutId = BaseCardWithoutId | PlacedCardWithoutId
export type BaseCardWithoutId = Omit<BaseCard, 'id'>
export type PlacedCardWithoutId = Omit<PlacedCard, 'id'>
