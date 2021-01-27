import {
    commandersHornModifier,
    moraleBoostModifier,
    tightBondModifier,
    weatherModifier,
} from '../rules/effects/modifiers'

export const TIGHT_BOND_MODIFIER = {
    id: 'tight-bond',
    priority: 1,
    effect: tightBondModifier,
}

export const MORALE_BOOST_MODIFIER = {
    id: 'morale-boost',
    priority: 2,
    effect: moraleBoostModifier,
}

export const COMMANDERS_HORN_MODIFIER = {
    id: 'commanders-horn',
    priority: 3,
    effect: commandersHornModifier,
}

export const WEATHER_MODIFIER = {
    id: 'weather',
    priority: 4,
    effect: weatherModifier,
}
