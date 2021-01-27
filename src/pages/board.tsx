import React, { useState } from 'react'
import { BoardComponent } from '../components/Board/Board'
import { DECK_TYPE } from '../constants/constants'
import { DECKS } from '../constants/decks'
interface BoardPageProps {

}

function mixDeckWithNeutral(type: DECK_TYPE) {
    return [...DECKS[DECK_TYPE.NEUTRAL], ...DECKS[type]]
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

    const [playerDeck] = useState(shuffled(mixDeckWithNeutral(DECK_TYPE.NORTHERN_REALMS)))
    const [enemyDeck] = useState(shuffled(mixDeckWithNeutral(DECK_TYPE.NORTHERN_REALMS)))

    return (
        <BoardComponent
            playerDeck={playerDeck}
            enemyDeck={enemyDeck}
        />
    )
}