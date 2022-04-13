import { modifierCondition } from '../rules/effects/conditions'
import {
	clearWeatherEffect,
	decoyEffect,
	medicEffect,
	scorchEffect,
	spyEffect,
} from '../rules/effects/effects'
import { CardWithoutId } from '../types/card'
import { MELEE_SPY_CARD, WEATHER_CARD } from './cards'
import { BATTLEFIELD_LINE, CARD_TYPE, DECK_TYPE, PLACED_CARD_TYPE } from './constants'
import { COMMANDERS_HORN_MODIFIER, MORALE_BOOST_MODIFIER, TIGHT_BOND_MODIFIER } from './modifiers'
import eilhart from '../assets/cards/eilhart.png'
import roche from '../assets/cards/roche.png'
import thyssen from '../assets/cards/thyssen.png'
import natalis from '../assets/cards/natalis.png'
import thaler from '../assets/cards/thaler.png'
import foot_soldier1 from '../assets/cards/foot_soldier1.png'
import infantry from '../assets/cards/infantry.png'
import siege_expert1 from '../assets/cards/siege_expert1.png'
import yarpen from '../assets/cards/yarpen.png'
import dijkstra from '../assets/cards/dijkstra.png'
import skaggs from '../assets/cards/skaggs.png'
import commando from '../assets/cards/commando.png'
import sabrina from '../assets/cards/sabrina.png'
import ves from '../assets/cards/ves.png'
import siegfried from '../assets/cards/siegfried.png'
import stennis from '../assets/cards/stennis.png'
import crinfrid from '../assets/cards/crinfrid.png'
import keira from '../assets/cards/keira.png'
import medic from '../assets/cards/medic.png'
import sile from '../assets/cards/sile.png'
import dethmold from '../assets/cards/dethmold.png'
import ballista1 from '../assets/cards/ballista1.png'
import catapult from '../assets/cards/catapult.png'
import geralt from '../assets/cards/geralt.png'
import ciri from '../assets/cards/ciri.png'
import yen from '../assets/cards/yen.png'
import triss from '../assets/cards/triss.png'
import avallach from '../assets/cards/avallach.png'
import dandelion from '../assets/cards/dandelion.png'
import zoltan from '../assets/cards/zoltan.png'
import vesemir from '../assets/cards/vesemir.png'
import villentretenmerth from '../assets/cards/villentretenmerth.png'
import frost from '../assets/cards/frost.png'
import fog from '../assets/cards/fog.png'
import rain from '../assets/cards/rain.png'
import clear from '../assets/cards/clear.png'
import decoy from '../assets/cards/decoy.png'
import scorch from '../assets/cards/scorch.png'
import horn from '../assets/cards/horn.png'
import siegeTower from '../assets/cards/siege_tower.png'
import trebuchet1 from '../assets/cards/trebuchet1.png'

export const CARD_LIST: (CardWithoutId & { occurence: number })[] = [
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Philippa Eilhart',
		imageUrl: eilhart,
		type: CARD_TYPE.PLACED,
		originalStrength: 10,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Vernon Roche',
		imageUrl: roche,
		type: CARD_TYPE.PLACED,
		originalStrength: 10,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Esterad Thyssen',
		imageUrl: thyssen,
		type: CARD_TYPE.PLACED,
		originalStrength: 10,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'John Natalis',
		imageUrl: natalis,
		type: CARD_TYPE.PLACED,
		originalStrength: 10,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Thaler',
		imageUrl: thaler,
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
		imageUrl: foot_soldier1,
		type: CARD_TYPE.PLACED,
		originalStrength: 1,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 2,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Poor Fucking Infantry',
		imageUrl: infantry,
		modifier: TIGHT_BOND_MODIFIER,
		type: CARD_TYPE.PLACED,
		originalStrength: 1,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 3,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Kaedweni Siege Expert',
		imageUrl: siege_expert1,
		modifier: MORALE_BOOST_MODIFIER,
		type: CARD_TYPE.PLACED,
		originalStrength: 1,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		occurence: 3,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Yarpen Zigrin',
		imageUrl: yarpen,
		type: CARD_TYPE.PLACED,
		originalStrength: 2,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		...MELEE_SPY_CARD,
		deckType: DECK_TYPE.NORTHERN_REALMS,
		imageUrl: dijkstra,
		title: 'Sigismund Dijkstra',
		originalStrength: 4,
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Sheldon Skaggs',
		imageUrl: skaggs,
		type: CARD_TYPE.PLACED,
		originalStrength: 4,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Blue Stripes Commando',
		imageUrl: commando,
		modifier: TIGHT_BOND_MODIFIER,
		type: CARD_TYPE.PLACED,
		originalStrength: 4,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 3,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Sabrina Gevissig',
		imageUrl: sabrina,
		type: CARD_TYPE.PLACED,
		originalStrength: 4,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Ves',
		imageUrl: ves,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Siegfried of Denesle',
		imageUrl: siegfried,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		...MELEE_SPY_CARD,
		deckType: DECK_TYPE.NORTHERN_REALMS,
		imageUrl: stennis,
		title: 'Prince Stennis',
		originalStrength: 5,
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Crinfrid Reavers Dragon Hunter',
		imageUrl: crinfrid,
		modifier: TIGHT_BOND_MODIFIER,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 3,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Keira Metz',
		imageUrl: keira,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Dun Banner Medic',
		imageUrl: medic,
		onCardPlayed: medicEffect,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Sile de Tansarville',
		imageUrl: sile,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Siege Tower',
		imageUrl: siegeTower,
		type: CARD_TYPE.PLACED,
		originalStrength: 6,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Dethmold',
		imageUrl: dethmold,
		type: CARD_TYPE.PLACED,
		originalStrength: 6,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Trebuchet',
		imageUrl: trebuchet1,
		type: CARD_TYPE.PLACED,
		originalStrength: 6,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		occurence: 2,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Ballista',
		imageUrl: ballista1,
		type: CARD_TYPE.PLACED,
		originalStrength: 6,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NORTHERN_REALMS,
		title: 'Catapult',
		imageUrl: catapult,
		modifier: TIGHT_BOND_MODIFIER,
		type: CARD_TYPE.PLACED,
		originalStrength: 8,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		occurence: 2,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Geralt of Rivia',
		imageUrl: geralt,
		type: CARD_TYPE.PLACED,
		originalStrength: 15,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Cirilla Fiona Elen Riannon',
		imageUrl: ciri,
		type: CARD_TYPE.PLACED,
		originalStrength: 15,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Yennefer of Vengerberg',
		imageUrl: yen,
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
		imageUrl: triss,
		type: CARD_TYPE.PLACED,
		originalStrength: 7,
		isHero: true,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		...MELEE_SPY_CARD,
		deckType: DECK_TYPE.NEUTRAL,
		imageUrl: avallach,
		title: 'Avallac’h',
		originalStrength: 0,
		isHero: true,
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Dandelion',
		imageUrl: dandelion,
		modifier: COMMANDERS_HORN_MODIFIER,
		type: CARD_TYPE.PLACED,
		originalStrength: 2,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Zoltan Chivay',
		imageUrl: zoltan,
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Emiel Regis Rohellec Terzieff',
		imageUrl: '',
		type: CARD_TYPE.PLACED,
		originalStrength: 5,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Vesemir',
		imageUrl: vesemir,
		type: CARD_TYPE.PLACED,
		originalStrength: 6,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Villentretenmerth',
		imageUrl: villentretenmerth,
		onCardPlayed: scorchEffect,
		type: CARD_TYPE.PLACED,
		originalStrength: 7,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		occurence: 1,
	},
	{
		...WEATHER_CARD,
		title: 'Biting Frost',
		imageUrl: frost,
		unitTypes: [PLACED_CARD_TYPE.MELEE],
		authorizedLines: [BATTLEFIELD_LINE.ENEMY_MELEE, BATTLEFIELD_LINE.PLAYER_MELEE],
		occurence: 3,
	},
	{
		...WEATHER_CARD,
		title: 'Impenetrable Fog',
		imageUrl: fog,
		unitTypes: [PLACED_CARD_TYPE.RANGED],
		authorizedLines: [BATTLEFIELD_LINE.ENEMY_RANGED, BATTLEFIELD_LINE.PLAYER_RANGED],
		occurence: 3,
	},
	{
		...WEATHER_CARD,
		title: 'Torrential Rain',
		imageUrl: rain,
		unitTypes: [PLACED_CARD_TYPE.SIEGE],
		authorizedLines: [BATTLEFIELD_LINE.ENEMY_SIEGE, BATTLEFIELD_LINE.PLAYER_SIEGE],
		occurence: 3,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Clear Weather',
		imageUrl: clear,
		onCardPlayed: clearWeatherEffect,
		type: CARD_TYPE.EFFECT,
		occurence: 2,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Decoy',
		imageUrl: decoy,
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
		imageUrl: scorch,
		onCardPlayed: scorchEffect,
		type: CARD_TYPE.EFFECT,
		occurence: 3,
	},
	{
		deckType: DECK_TYPE.NEUTRAL,
		title: 'Commander’s Horn',
		imageUrl: horn,
		modifier: COMMANDERS_HORN_MODIFIER,
		canBePlayed: modifierCondition,
		type: CARD_TYPE.MODIFIER,
		originalStrength: 0,
		unitTypes: [PLACED_CARD_TYPE.MELEE, PLACED_CARD_TYPE.RANGED, PLACED_CARD_TYPE.SIEGE],
		occurence: 3,
	},
]
