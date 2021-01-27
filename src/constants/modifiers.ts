import {
    commandersHornModifier,
    moraleBoostModifier,
    tightBondModifier,
    weatherModifier,
} from '../rules/effects/modifiers'
import { Modifier } from '../types/card'

export const TIGHT_BOND_MODIFIER: Modifier = {
    id: 'tight-bond',
    positive: true,
    priority: 1,
    effect: tightBondModifier,
}

export const MORALE_BOOST_MODIFIER: Modifier = {
    id: 'morale-boost',
    positive: true,
    priority: 2,
    effect: moraleBoostModifier,
}

export const COMMANDERS_HORN_MODIFIER: Modifier = {
    id: 'commanders-horn',
    positive: true,
    priority: 3,
    effect: commandersHornModifier,
}

export const WEATHER_MODIFIER: Modifier = {
    id: 'weather',
    positive: false,
    priority: 4,
    effect: weatherModifier,
}
