import { isNil, not, type } from 'ramda'
import { BattlefieldRows, emptyBattlefieldRows } from '../components/Board/Board'
import { notNil } from '../helpers'
import { BaseCard, Card, GameState, getStrength, PlacedCard } from './card'

export enum BATTLEFIELD_LINE {
    ENEMY_SIEGE,
    ENEMY_RANGED,
    ENEMY_MELEE,
    PLAYER_MELEE,
    PLAYER_RANGED,
    PLAYER_SIEGE,
}

export const PLAYER_LINES = [
    BATTLEFIELD_LINE.PLAYER_MELEE,
    BATTLEFIELD_LINE.PLAYER_RANGED,
    BATTLEFIELD_LINE.PLAYER_SIEGE,
]

export const ENEMY_LINES = [
    BATTLEFIELD_LINE.ENEMY_MELEE,
    BATTLEFIELD_LINE.ENEMY_RANGED,
    BATTLEFIELD_LINE.ENEMY_SIEGE,
]

export const LINES_NAME: Record<BATTLEFIELD_LINE, string> = {
    [BATTLEFIELD_LINE.ENEMY_SIEGE]: 'Siege',
    [BATTLEFIELD_LINE.ENEMY_RANGED]: 'Ranged',
    [BATTLEFIELD_LINE.ENEMY_MELEE]: 'Melee',
    [BATTLEFIELD_LINE.PLAYER_MELEE]: 'Melee',
    [BATTLEFIELD_LINE.PLAYER_RANGED]: 'Ranged',
    [BATTLEFIELD_LINE.PLAYER_SIEGE]: 'Siege',
}

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

export const CARD_TYPE_NAMES: Record<CARD_TYPE, string> = {
    [CARD_TYPE.PLACED]: 'Unit',
    [CARD_TYPE.EFFECT]: 'Effect',
    [CARD_TYPE.MODIFIER]: 'Modifier',
}

export const PLACED_CARD_TYPE_NAMES: Record<PLACED_CARD_TYPE, string> = {
    [PLACED_CARD_TYPE.MELEE]: 'Melee',
    [PLACED_CARD_TYPE.RANGED]: 'Ranged',
    [PLACED_CARD_TYPE.SIEGE]: 'Siege',
    [PLACED_CARD_TYPE.HERO]: 'Hero',
}

export const CARD_AUTHORIZED_LINES: Record<PLACED_CARD_TYPE, BATTLEFIELD_LINE[]> = {
    [PLACED_CARD_TYPE.MELEE]: [BATTLEFIELD_LINE.ENEMY_MELEE, BATTLEFIELD_LINE.PLAYER_MELEE],
    [PLACED_CARD_TYPE.RANGED]: [BATTLEFIELD_LINE.ENEMY_RANGED, BATTLEFIELD_LINE.PLAYER_RANGED],
    [PLACED_CARD_TYPE.SIEGE]: [BATTLEFIELD_LINE.ENEMY_SIEGE, BATTLEFIELD_LINE.PLAYER_SIEGE],
    [PLACED_CARD_TYPE.HERO]: [],
}

function medicEffect(self: Card, state: GameState): GameState {
    console.log('medic effect')
    return state
}
function clearWeatherEffect(self: Card, state: GameState): GameState {
    console.log('clear weather effect')
    return state
}
function moraleBoostEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('morale boost effect')
    return line.map(card => {
        if (card != self) {
            return {
                ...card,
                apparentStrength: !!card.apparentStrength ? card.apparentStrength + 1 : card.strength + 1,
            }
        } else {
            return card
        }
    })
}
function musterEffect(self: Card, state: GameState): GameState {
    console.log('muster effect')

    while (state.playerDeck.some(card => card.title == self.title)) {
        let index = state.playerDeck.findIndex(card => card.title == self.title)
        state.playerHand.push(state.playerDeck[index])
        state.playerDeck.splice(index, 1)
    }

    return state
}
function spyEffect(self: Card, state: GameState): GameState {
    console.log('spy effect')
    return state
}
function tightBondEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('tight bond effect')
    return line.map(card => {
        if (card == self) {
            let howManyIdenticalCards = line.filter(c => c.title == self.title).length
            return {
                ...card,
                apparentStrength: !!card.apparentStrength
                    ? card.apparentStrength * howManyIdenticalCards
                    : card.strength * howManyIdenticalCards,
            }
        } else {
            return card
        }
    })
}
function weatherEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('weather effect')
    return line
}
function commandersHornEffect(self: PlacedCard, line: PlacedCard[]): PlacedCard[] {
    console.log('horn effect')
    return line
}
function decoyEffect(self: Card, state: GameState): GameState {
    console.log('decoy effect')
    return state
}
function scorchEffect(self: Card, state: GameState): GameState {
    console.log('scorch effect')
    let cardsStrength = Object.values(state.board).flatMap(line => line.map(getStrength))
    let maxStrength = Math.max(...cardsStrength)
    let scorchedBoard: BattlefieldRows = emptyBattlefieldRows

    for (let lineTypeString in BATTLEFIELD_LINE) {
        let lineType = Number(lineTypeString) as BATTLEFIELD_LINE
        let line = state.board[lineType]

        if (!line) continue

        let scorchedLine = line.filter(card => getStrength(card) < maxStrength)
        scorchedBoard[lineType] = scorchedLine
    }

    state.board = scorchedBoard
    return state
}

type CardWithoutId = Omit<BaseCard, 'id'> | Omit<PlacedCard, 'id'>

export const CARD_LIST: (CardWithoutId & { occurence: number })[] = [
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
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_SIEGE],
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
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE],
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
        authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE],
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
        onCardPlayed: clearWeatherEffect,
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
]

function getActualDeck(deckType: DECK_TYPE): Card[] {
    return CARD_LIST.filter(card => card.deckType == deckType) // Only the card from the deck
        .flatMap(card =>
            [...Array(card.occurence)].map((_, i) => ({
                ...card,
                id: `${card.title.replaceAll(' ', '_')}_${i}`,
            }))
        ) // One for each occurence
}

export const DECKS: Record<DECK_TYPE, Card[]> = {
    [DECK_TYPE.NORTHERN_REALMS]: getActualDeck(DECK_TYPE.NORTHERN_REALMS),
    [DECK_TYPE.NILFGAARDIAN_EMPIRE]: getActualDeck(DECK_TYPE.NILFGAARDIAN_EMPIRE),
    [DECK_TYPE.SCOIATAEL]: getActualDeck(DECK_TYPE.SCOIATAEL),
    [DECK_TYPE.MONSTER]: getActualDeck(DECK_TYPE.MONSTER),
    [DECK_TYPE.NEUTRAL]: getActualDeck(DECK_TYPE.NEUTRAL),
}
