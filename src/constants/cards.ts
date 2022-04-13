import { weatherCondition } from '../rules/effects/conditions'
import { spyEffect, weatherEffect } from '../rules/effects/effects'
import { BATTLEFIELD_LINE, CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from './constants'
import { WEATHER_MODIFIER } from './modifiers'

export const WEATHER_CARD = {
	deckType: DECK_TYPE.NEUTRAL,
	modifier: WEATHER_MODIFIER,
	onCardPlayed: weatherEffect,
	canBePlayed: weatherCondition,
	type: CARD_TYPE.MODIFIER,
	originalStrength: 0,
}

export const MELEE_SPY_CARD = {
	onCardPlayed: spyEffect,
	type: CARD_TYPE.PLACED,
	originalStrength: 0,
	unitTypes: [PLACED_CARD_TYPE.MELEE],
	authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE],
}