import { modifierCondition, weatherCondition } from '../rules/effects/conditions'
import {
    clearWeatherEffect,
    decoyEffect,
    medicEffect,
    scorchEffect,
    spyEffect,
    weatherEffect,
} from '../rules/effects/effects'
import { CardWithoutId } from '../types/card'
import { BATTLEFIELD_LINE, CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from './constants'
import {
    COMMANDERS_HORN_MODIFIER,
    MORALE_BOOST_MODIFIER,
    TIGHT_BOND_MODIFIER,
    WEATHER_MODIFIER,
} from './modifiers'

export const CARD_LIST: (CardWithoutId & { occurence: number })[] = [
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Philippa Eilhart',
        type: CARD_TYPE.PLACED,
        originalStrength: 10,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Vernon Roche',
        type: CARD_TYPE.PLACED,
        originalStrength: 10,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Esterad Thyssen',
        type: CARD_TYPE.PLACED,
        originalStrength: 10,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'John Natalis',
        type: CARD_TYPE.PLACED,
        originalStrength: 10,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Thaler',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 1,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Redanian Foot Soldier',
        type: CARD_TYPE.PLACED,
        originalStrength: 1,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Poor Fucking Infantry',
        modifier: TIGHT_BOND_MODIFIER,
        type: CARD_TYPE.PLACED,
        originalStrength: 1,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Kaedweni Siege Expert',
        modifier: MORALE_BOOST_MODIFIER,
        type: CARD_TYPE.PLACED,
        originalStrength: 1,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Yarpen Zigrin',
        type: CARD_TYPE.PLACED,
        originalStrength: 2,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sigismund Dijkstra',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 4,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sheldon Skaggs',
        type: CARD_TYPE.PLACED,
        originalStrength: 4,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Blue Stripes Commando',
        modifier: TIGHT_BOND_MODIFIER,
        type: CARD_TYPE.PLACED,
        originalStrength: 4,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sabrina Gevissig',
        type: CARD_TYPE.PLACED,
        originalStrength: 4,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Ves',
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Siegfried of Denesle',
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Prince Stennis',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Crinfrid Reavers Dragon Hunter',
        modifier: TIGHT_BOND_MODIFIER,
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Keira Metz',
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Dun Banner Medic',
        onCardPlayed: medicEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sile de Tansarville',
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Siege Tower',
        type: CARD_TYPE.PLACED,
        originalStrength: 6,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Dethmold',
        type: CARD_TYPE.PLACED,
        originalStrength: 6,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Trebuchet',
        type: CARD_TYPE.PLACED,
        originalStrength: 6,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Ballista',
        type: CARD_TYPE.PLACED,
        originalStrength: 6,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Catapult',
        modifier: TIGHT_BOND_MODIFIER,
        type: CARD_TYPE.PLACED,
        originalStrength: 8,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Geralt of Rivia',
        type: CARD_TYPE.PLACED,
        originalStrength: 15,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Cirilla Fiona Elen Riannon',
        type: CARD_TYPE.PLACED,
        originalStrength: 15,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Yennefer of Vengerberg',
        onCardPlayed: medicEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 7,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Triss Merigold',
        type: CARD_TYPE.PLACED,
        originalStrength: 7,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Avallac’h',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 7,
        isHero: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Dandelion',
        modifier: COMMANDERS_HORN_MODIFIER,
        type: CARD_TYPE.PLACED,
        originalStrength: 2,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Zoltan Chivay',
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Emiel Regis Rohellec Terzieff',
        type: CARD_TYPE.PLACED,
        originalStrength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Vesemir',
        type: CARD_TYPE.PLACED,
        originalStrength: 6,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Villentretenmerth',
        onCardPlayed: scorchEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 7,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Biting Frost',
        modifier: WEATHER_MODIFIER,
        onCardPlayed: weatherEffect,
        canBePlayed: weatherCondition,
        type: CARD_TYPE.MODIFIER,
        originalStrength: 0,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE, BATTLEFIELD_LINE.PLAYER_MELEE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Impenetrable Fog',
        modifier: WEATHER_MODIFIER,
        onCardPlayed: weatherEffect,
        canBePlayed: weatherCondition,
        type: CARD_TYPE.MODIFIER,
        originalStrength: 0,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_RANGED, BATTLEFIELD_LINE.PLAYER_RANGED],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Torrential Rain',
        modifier: WEATHER_MODIFIER,
        onCardPlayed: weatherEffect,
        canBePlayed: weatherCondition,
        type: CARD_TYPE.MODIFIER,
        originalStrength: 0,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_SIEGE, BATTLEFIELD_LINE.PLAYER_SIEGE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Clear Weather',
        onCardPlayed: clearWeatherEffect,
        type: CARD_TYPE.EFFECT,
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Decoy',
        onCardPlayed: decoyEffect,
        type: CARD_TYPE.PLACED,
        originalStrength: 0,
        canBePlacedOverACard: true,
        unitTypes: [PLACED_CARD_TYPE.MELEE, PLACED_CARD_TYPE.RANGED, PLACED_CARD_TYPE.SIEGE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Scorch',
        onCardPlayed: scorchEffect,
        type: CARD_TYPE.EFFECT,
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Commander’s Horn',
        modifier: COMMANDERS_HORN_MODIFIER,
        canBePlayed: modifierCondition,
        type: CARD_TYPE.MODIFIER,
        originalStrength: 0,
        unitTypes: [PLACED_CARD_TYPE.MELEE, PLACED_CARD_TYPE.RANGED, PLACED_CARD_TYPE.SIEGE],
        occurence: 3,
    },
]
