import React, { useState } from 'react'
import { BoardComponent } from '../components/Board/Board'
import { Card } from '../models/card'
import { CARD_LIST, CARD_TYPE, DECKS, DECK_TYPE, PLACED_CARD_TYPE } from '../models/cardlist'
interface BoardPageProps {

}

function mixDeckWithNeutral(type: DECK_TYPE) {
    return [...DECKS[DECK_TYPE.NEUTRAL], ...DECKS[type]]
}

export function BoardPage(props: BoardPageProps = {}) {

    const [playerDeck] = useState([
        'Poor Fucking Infantry',
        'Poor Fucking Infantry',
        'Poor Fucking Infantry',
        'Redanian Foot Soldier',
        'Redanian Foot Soldier',
    ].map(title => CARD_LIST.find(c => c.title == title)) as Card[])
    const [enemyDeck] = useState(shuffled(mixDeckWithNeutral(DECK_TYPE.NORTHERN_REALMS)))

    function shuffled<T>(array: T[]): T[] {
        let shuffledArray = [...array]
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