import { eqProps, equals } from 'ramda';
import { Card } from './card';

export enum DECK_TYPE {
    NORTHERN_REALMS,
    NILFGAARDIAN_EMPIRE,
    SCOIATAEL,
    MONSTER,
    NEUTRAL,
}

export enum CARD_TYPE {
    MELEE,
    RANGED,
    SIEGE,
    HERO,
    EFFECT,
    MODIFIER,
}

export const CARD_LIST: (Card & { occurence: number })[] = [
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Philippa Eilhart',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Vernon Roche',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Esterad Thyssen',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'John Natalis',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Thaler',
        strength: 1,
        types: [CARD_TYPE.SIEGE],
        //spy
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Redanian Foot Soldier',
        strength: 1,
        types: [CARD_TYPE.MELEE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Poor Fucking Infantry',
        strength: 1,
        types: [CARD_TYPE.MELEE],
        //tight bond
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Kaedweni Siege Expert',
        strength: 1,
        types: [CARD_TYPE.SIEGE],
        //morale boost
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Yarpen Zigrin',
        strength: 2,
        types: [CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sigismund Dijkstra',
        strength: 4,
        types: [CARD_TYPE.MELEE],
        //spy
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sheldon Skaggs',
        strength: 4,
        types: [CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Blue Stripes Commando',
        strength: 4,
        types: [CARD_TYPE.MELEE],
        //tight bond
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sabrina Gevissig',
        strength: 4,
        types: [CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Ves',
        strength: 5,
        types: [CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Siegfried of Denesle',
        strength: 5,
        types: [CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Prince Stennis',
        strength: 5,
        types: [CARD_TYPE.MELEE],
        //spy
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Crinfrid Reavers Dragon Hunter',
        strength: 5,
        types: [CARD_TYPE.RANGED],
        //tight bond
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Keira Metz',
        strength: 5,
        types: [CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Dun Banner Medic',
        strength: 5,
        types: [CARD_TYPE.SIEGE],
        //medic
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sile de Tansarville',
        strength: 5,
        types: [CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Siege Tower',
        strength: 6,
        types: [CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Dethmold',
        strength: 6,
        types: [CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Trebuchet',
        strength: 6,
        types: [CARD_TYPE.SIEGE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Ballista',
        strength: 6,
        types: [CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Catapult',
        strength: 8,
        types: [CARD_TYPE.SIEGE],
        //tight bond
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Geralt of Rivia',
        strength: 15,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Cirilla Fiona Elen Riannon',
        strength: 15,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Yennefer of Vengerberg',
        strength: 7,
        types: [CARD_TYPE.HERO, CARD_TYPE.RANGED],
        //medic
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Triss Merigold',
        strength: 7,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Avallac’h',
        strength: 7,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
        //spy
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Dandelion',
        strength: 2,
        types: [CARD_TYPE.MELEE],
        //boost morale
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Zoltan Chivay',
        strength: 5,
        types: [CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Emiel Regis Rohellec Terzieff',
        strength: 5,
        types: [CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Vesemir',
        strength: 6,
        types: [CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Villentretenmerth',
        strength: 7,
        types: [CARD_TYPE.MELEE],
        //scorch
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Biting Frost',
        types: [CARD_TYPE.EFFECT],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Impenetrable Fog',
        types: [CARD_TYPE.EFFECT],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Torrential Rain',
        types: [CARD_TYPE.EFFECT],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Clear Weather',
        types: [CARD_TYPE.EFFECT],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Decoy',
        strength: 0,
        types: [CARD_TYPE.MELEE, CARD_TYPE.RANGED, CARD_TYPE.SIEGE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Scorch',
        types: [CARD_TYPE.EFFECT],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Commander’s Horn',
        types: [CARD_TYPE.MODIFIER],
        occurence: 3,
    },
];

function getActualDeck(deckType: DECK_TYPE): Card[] {
    return CARD_LIST.filter((card) => card.deckType == deckType).flatMap((card) =>
        Array(card.occurence).fill(card)
    );
}

export const DECKS: Record<DECK_TYPE, Card[]> = {
    [DECK_TYPE.NORTHERN_REALMS]: getActualDeck(DECK_TYPE.NORTHERN_REALMS),
    [DECK_TYPE.NILFGAARDIAN_EMPIRE]: getActualDeck(DECK_TYPE.NILFGAARDIAN_EMPIRE),
    [DECK_TYPE.SCOIATAEL]: getActualDeck(DECK_TYPE.SCOIATAEL),
    [DECK_TYPE.MONSTER]: getActualDeck(DECK_TYPE.MONSTER),
    [DECK_TYPE.NEUTRAL]: getActualDeck(DECK_TYPE.NEUTRAL),
};
