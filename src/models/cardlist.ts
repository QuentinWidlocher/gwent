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
}

export const CARD_LIST: Card[] = [
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Philippa Eilhart',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.RANGED],
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Vernon Roche',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Esterad Thyssen',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'John Natalis',
        strength: 10,
        types: [CARD_TYPE.HERO, CARD_TYPE.MELEE],
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Thaler',
        strength: 1,
        types: [CARD_TYPE.SIEGE],
        //spy
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Redanian Foot Soldier',
        strength: 1,
        types: [CARD_TYPE.MELEE],
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Poor Fucking Infantry',
        strength: 1,
        types: [CARD_TYPE.MELEE],
        //tight bond
    },
];
