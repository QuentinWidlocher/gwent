import React from 'react'
import { BoardComponent } from '../components/Board/Board'
import { Card } from '../models/card'
import { CARD_TYPE } from '../models/constants'

interface BoardPageProps {

}

export function BoardPage(props: BoardPageProps = {}) {

    const cards: Card[] = [
        { title: 'Gérard', strength: 15, type: CARD_TYPE.MELEE },
        { title: 'Béatrice', strength: 10, type: CARD_TYPE.RANGED },
        { title: 'Jennifer', strength: 10, type: CARD_TYPE.SIEGE },
        { title: 'Cyrille', strength: 12, type: CARD_TYPE.MELEE },
        { title: 'Jacques', strength: 2, type: CARD_TYPE.RANGED },
    ]

    return (
        <BoardComponent
            cards={cards}
        />
    )
}