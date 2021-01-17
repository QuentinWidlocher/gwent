import React from 'react'
import { BoardComponent } from '../components/Board/Board'
import { Card } from '../models/card'

interface BoardPageProps {

}

export function BoardPage(props: BoardPageProps = {}) {

    const cards: Card[] = ['Gérard', 'Béatrice', 'Jennifer', 'Cyrile'].map(title => ({ title }))

    return (
        <BoardComponent
            cards={cards}
        />
    )
}