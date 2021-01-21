import { getActualDeck } from '../helpers/deck'
import { Card } from '../types/card'
import { DECK_TYPE } from './constants'

export const DECKS: Record<DECK_TYPE, Card[]> = {
    [DECK_TYPE.NORTHERN_REALMS]: getActualDeck(DECK_TYPE.NORTHERN_REALMS),
    [DECK_TYPE.NILFGAARDIAN_EMPIRE]: getActualDeck(DECK_TYPE.NILFGAARDIAN_EMPIRE),
    [DECK_TYPE.SCOIATAEL]: getActualDeck(DECK_TYPE.SCOIATAEL),
    [DECK_TYPE.MONSTER]: getActualDeck(DECK_TYPE.MONSTER),
    [DECK_TYPE.NEUTRAL]: getActualDeck(DECK_TYPE.NEUTRAL),
}
