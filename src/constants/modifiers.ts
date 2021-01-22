import {
    commandersHornModifier,
    moraleBoostModifier,
    tightBondModifier,
    weatherModifier,
} from '../rules/effects/modifiers'

export const TIGHT_BOND_MODIFIER = {
    priority: 1,
    effect: tightBondModifier,
}

export const MORALE_BOOST_MODIFIER = {
    priority: 2,
    effect: moraleBoostModifier,
}

export const COMMANDERS_HORN_MODIFIER = {
    priority: 3,
    effect: commandersHornModifier,
}

export const WEATHER_MODIFIER = {
    priority: 4,
    effect: weatherModifier,
}
