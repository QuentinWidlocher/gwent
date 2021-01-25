import { Battlefield } from './aliases'
import { Card, PlacedCard } from './card'

export type GameState = {
    playerHand: Card[]
    enemyHand: Card[]
    playerDeck: Card[]
    enemyDeck: Card[]
    playerDiscard: Card[]
    enemyDiscard: Card[]
    weatherCards: PlacedCard[]
    battlefield: Battlefield
}
