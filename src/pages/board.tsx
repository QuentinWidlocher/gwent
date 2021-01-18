import React from 'react'
import { BoardComponent } from '../components/Board/Board'
import { Card } from '../models/card'
import { CARD_LIST, CARD_TYPE } from '../models/cardlist'

interface BoardPageProps {

}

export function BoardPage(props: BoardPageProps = {}) {

    return (
        <BoardComponent
            cards={CARD_LIST}
        />
    )
}