import { Card, PlacedCard } from './card';

export enum DECK_TYPE {
    NORTHERN_REALMS,
    NILFGAARDIAN_EMPIRE,
    SCOIATAEL,
    MONSTER,
    NEUTRAL,
}

export enum CARD_TYPE {
    PLACED,
    EFFECT,
    MODIFIER,
}

export enum PLACED_CARD_TYPE {
    MELEE,
    RANGED,
    SIEGE,
    HERO,
}

function medicEffect() {
    console.log('medic effect');
}
function moraleBoostEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('morale boost effect');
    return line.map((card) => {
        if (card != self) {
            return {
                ...card,
                apparentStrength: !!card.apparentStrength ? card.apparentStrength + 1 : card.strength + 1,
            };
        } else {
            return card;
        }
    });
}
function musterEffect() {
    console.log('muster effect');
}
function spyEffect() {
    console.log('spy effect');
}
function tightBondEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('tight bond effect');
    return line.map((card) => {
        if (card == self) {
            let howManyIdenticalCards = line.filter((c) => c.title == self.title).length;
            return {
                ...card,
                apparentStrength: !!card.apparentStrength
                    ? card.apparentStrength * howManyIdenticalCards
                    : card.strength * howManyIdenticalCards,
            };
        } else {
            return card;
        }
    });
}
function weatherEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('weather effect');
    return line;
}
function commandersHornEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('horn effect');
    return line;
}
function decoyEffect() {
    console.log('decoy effect');
}
function scorchEffect() {
    console.log('scorch effect');
}

export const CARD_LIST: (Card & { occurence: number })[] = [
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Philippa Eilhart',
        type: CARD_TYPE.PLACED,
        strength: 10,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Vernon Roche',
        type: CARD_TYPE.PLACED,
        strength: 10,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Esterad Thyssen',
        type: CARD_TYPE.PLACED,
        strength: 10,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'John Natalis',
        type: CARD_TYPE.PLACED,
        strength: 10,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Thaler',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        strength: 1,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Redanian Foot Soldier',
        type: CARD_TYPE.PLACED,
        strength: 1,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Poor Fucking Infantry',
        modifyPoints: {
            priority: 1,
            effect: tightBondEffect,
        },
        type: CARD_TYPE.PLACED,
        strength: 1,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Kaedweni Siege Expert',
        modifyPoints: {
            priority: 2,
            effect: moraleBoostEffect,
        },
        type: CARD_TYPE.PLACED,
        strength: 1,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Yarpen Zigrin',
        type: CARD_TYPE.PLACED,
        strength: 2,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sigismund Dijkstra',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        strength: 4,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sheldon Skaggs',
        type: CARD_TYPE.PLACED,
        strength: 4,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Blue Stripes Commando',
        modifyPoints: {
            priority: 1,
            effect: tightBondEffect,
        },
        type: CARD_TYPE.PLACED,
        strength: 4,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sabrina Gevissig',
        type: CARD_TYPE.PLACED,
        strength: 4,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Ves',
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Siegfried of Denesle',
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Prince Stennis',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Crinfrid Reavers Dragon Hunter',
        modifyPoints: {
            priority: 1,
            effect: tightBondEffect,
        },
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Keira Metz',
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Dun Banner Medic',
        onCardPlayed: medicEffect,
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Sile de Tansarville',
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Siege Tower',
        type: CARD_TYPE.PLACED,
        strength: 6,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Dethmold',
        type: CARD_TYPE.PLACED,
        strength: 6,
        unitTypes: [PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Trebuchet',
        type: CARD_TYPE.PLACED,
        strength: 6,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Ballista',
        type: CARD_TYPE.PLACED,
        strength: 6,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NORTHERN_REALMS,
        title: 'Catapult',
        modifyPoints: {
            priority: 1,
            effect: tightBondEffect,
        },
        type: CARD_TYPE.PLACED,
        strength: 8,
        unitTypes: [PLACED_CARD_TYPE.SIEGE],
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Geralt of Rivia',
        type: CARD_TYPE.PLACED,
        strength: 15,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Cirilla Fiona Elen Riannon',
        type: CARD_TYPE.PLACED,
        strength: 15,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Yennefer of Vengerberg',
        onCardPlayed: medicEffect,
        type: CARD_TYPE.PLACED,
        strength: 7,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.RANGED],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Triss Merigold',
        type: CARD_TYPE.PLACED,
        strength: 7,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Avallac’h',
        onCardPlayed: spyEffect,
        type: CARD_TYPE.PLACED,
        strength: 7,
        unitTypes: [PLACED_CARD_TYPE.HERO, PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Dandelion',
        modifyPoints: {
            priority: 2,
            effect: moraleBoostEffect,
        },
        type: CARD_TYPE.PLACED,
        strength: 2,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Zoltan Chivay',
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Emiel Regis Rohellec Terzieff',
        type: CARD_TYPE.PLACED,
        strength: 5,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Vesemir',
        type: CARD_TYPE.PLACED,
        strength: 6,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Villentretenmerth',
        onCardPlayed: scorchEffect,
        type: CARD_TYPE.PLACED,
        strength: 7,
        unitTypes: [PLACED_CARD_TYPE.MELEE],
        occurence: 1,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Biting Frost',
        modifyPoints: {
            priority: 3,
            effect: weatherEffect,
        },
        type: CARD_TYPE.MODIFIER,
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Impenetrable Fog',
        modifyPoints: {
            priority: 3,
            effect: weatherEffect,
        },
        type: CARD_TYPE.MODIFIER,
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Torrential Rain',
        modifyPoints: {
            priority: 3,
            effect: weatherEffect,
        },
        type: CARD_TYPE.MODIFIER,
        occurence: 3,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Clear Weather',
        onCardPlayed: () => {},
        type: CARD_TYPE.EFFECT,
        occurence: 2,
    },
    {
        deckType: DECK_TYPE.NEUTRAL,
        title: 'Decoy',
        onCardPlayed: decoyEffect,
        type: CARD_TYPE.PLACED,
        strength: 0,
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
        modifyPoints: {
            priority: 3,
            effect: commandersHornEffect,
        },
        type: CARD_TYPE.MODIFIER,
        occurence: 3,
    },
];

function getActualDeck(deckType: DECK_TYPE): Card[] {
    return CARD_LIST.filter((card) => card.deckType == deckType) // Only the card from the deck
        .flatMap((card) => Array(card.occurence).fill(card)); // One for each occurence
}

export const DECKS: Record<DECK_TYPE, Card[]> = {
    [DECK_TYPE.NORTHERN_REALMS]: getActualDeck(DECK_TYPE.NORTHERN_REALMS),
    [DECK_TYPE.NILFGAARDIAN_EMPIRE]: getActualDeck(DECK_TYPE.NILFGAARDIAN_EMPIRE),
    [DECK_TYPE.SCOIATAEL]: getActualDeck(DECK_TYPE.SCOIATAEL),
    [DECK_TYPE.MONSTER]: getActualDeck(DECK_TYPE.MONSTER),
    [DECK_TYPE.NEUTRAL]: getActualDeck(DECK_TYPE.NEUTRAL),
};
