import { Battlefield } from './aliases'
import { Card } from './card'

export type GameState = {
    playerHand: Card[]
    enemyHand: Card[]
    playerDeck: Card[]
    enemyDeck: Card[]
    playerDiscard: Card[]
    enemyDiscard: Card[]
    board: Battlefield
}
