import React, { useState } from 'react'
import { BoardComponent } from '../components/Board/Board'
import { Card } from '../models/card'
import { CARD_LIST, CARD_TYPE, DECKS, DECK_TYPE } from '../models/cardlist'

interface BoardPageProps {

}

export function BoardPage(props: BoardPageProps = {}) {

    const [playerDeck] = useState(shuffled(DECKS[DECK_TYPE.NORTHERN_REALMS]))
    const [enemyDeck] = useState(shuffled(DECKS[DECK_TYPE.NORTHERN_REALMS]))

    function shuffled<T>(array: T[]): T[] {
        let shuffledArray = [... array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray
    }

    return (
        <BoardComponent
            playerDeck={playerDeck}
            enemyDeck={enemyDeck}
        />
    )
}