import { append, without } from "ramda"
import React, { useState } from "react"
import { Card } from "../../../types/card"
import { CardPreviewComponent } from "../CardPreview/CardPreview"
import styles from "./CardSelector.module.css"

export type CardSelectorProps = {
    cardList: Card[]
    onCardsSelected: (card: Card[]) => void
    maxCardSelected: number
}

export function CardSelectorComponent(props: CardSelectorProps) {

    const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])

    function onCardClick(selectedCard: Card, cardIsSelected: boolean) {
        if (!cardIsSelected && canSelectACard()) {
            setSelectedCardIds(append(selectedCard.id))
        } else {
            setSelectedCardIds(without([selectedCard.id]))
        }
    }

    function canSelectACard() {
        return selectedCardIds.length < props.maxCardSelected
    }

    return (
        <div className={styles.fullscreenWrapper}>
            {props.cardList.map(card => {

                let cardIsSelected = selectedCardIds.includes(card.id)

                return (
                    <CardPreviewComponent
                        card={card}
                        key={card.id}
                        className={[
                            (cardIsSelected ? styles.selected : ''),
                            (canSelectACard() ? styles.selectable : ''),
                        ].join(' ')}
                        onClick={(selectedCard) => onCardClick(selectedCard, cardIsSelected)}
                    ></CardPreviewComponent>
                )
            })}
        </div>
    )
}