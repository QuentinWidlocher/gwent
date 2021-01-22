import {
    commandersHornEffect,
    moraleBoostEffect,
    tightBondEffect,
    weatherEffect,
} from '../rules/effects/modifiers'

export const TIGHT_BOND_MODIFIER = {
    priority: 1,
    effect: tightBondEffect,
}

export const MORALE_BOOST_MODIFIER = {
    priority: 2,
    effect: moraleBoostEffect,
}

export const COMMANDERS_HORN_MODIFIER = {
    priority: 3,
    effect: commandersHornEffect,
}

export const WEATHER_MODIFIER = {
    priority: 4,
    effect: weatherEffect,
}
