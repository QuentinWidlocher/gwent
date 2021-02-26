import React, { useState } from 'react'
import { BoardComponent } from '../components/Board/Board'
import { CardSelectorContextProvider } from '../components/Board/CardSelector/CardSelector'
import { DECK_TYPE } from '../constants/constants'
import { DECKS } from '../constants/decks'
import { findCards } from '../helpers/debug'
import { Card } from '../types/card'
interface BoardPageProps {

}

function mixDeckWithNeutral(type: DECK_TYPE) {
    return [...DECKS[DECK_TYPE.NEUTRAL], ...DECKS[type]]
}

function addIdentifier(id: string, deck: Card[]) {
    return deck.map(c => ({...c, id: `${c.id}-${id}`}))
}

function getDeck(player: string, type: DECK_TYPE) {
    return shuffled(addIdentifier(player, mixDeckWithNeutral(type)))
}

function shuffled<T>(array: T[]): T[] {
    let shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
}

export function BoardPage(_: BoardPageProps = {}) {

    const [playerDeck] = useState(findCards(['frost', 'infant']))//getDeck('player', DECK_TYPE.NORTHERN_REALMS))
    const [enemyDeck] = useState(findCards(['frost', 'infant']))//getDeck('opponent', DECK_TYPE.NORTHERN_REALMS))

    return (
        <CardSelectorContextProvider>
            <BoardComponent
                playerDeck={playerDeck}
                enemyDeck={enemyDeck}
            />
        </CardSelectorContextProvider>
    )
}