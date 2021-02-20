import { append, without } from "ramda"
import React, { PropsWithChildren, useContext, useRef, useState } from "react"
import { notNil } from "../../../helpers/helpers"
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

    function getSelectedCards(): Card[] {
        return selectedCardIds.map(selectedCardId => props.cardList.find(({ id }) => selectedCardId == id) ?? null).filter(notNil)
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
                    />
                )
            })}

            <button onClick={() => props.onCardsSelected(getSelectedCards())}>c okkkkk</button>
        </div>
    )
}

export type CardSelectorContextProps = { show: () => Promise<Card[]>, setCardList: (card: Card[]) => void, setMaxCardSelected: (value: number) => void }

const CardSelectorContext = React.createContext<CardSelectorContextProps>({
    show: () => Promise.resolve([]),
    setCardList: () => { },
    setMaxCardSelected: () => { },
});

export function CardSelectorContextProvider(props: PropsWithChildren<{}>) {
    const [showCardSelector, setShowCardSelector] = useState(false);
    const [cardList, setCardList] = useState<Card[]>([])
    const [maxCardSelected, setMaxCardSelected] = useState(1)
    const resolver = useRef<(cards: Card[]) => void>();

    function handleShow() {
        console.debug('cardList', cardList);

        setShowCardSelector(true);

        return new Promise<Card[]>(function (resolve) {
            resolver.current = resolve;
        });
    };

    function onCardsSelected(cards: Card[]) {
        resolver.current && resolver.current(cards);
        setShowCardSelector(false)
    };

    return (
        <CardSelectorContext.Provider value={{ show: handleShow, setCardList, setMaxCardSelected }}>

            {props.children}

            {showCardSelector && <CardSelectorComponent
                cardList={cardList}
                onCardsSelected={onCardsSelected}
                maxCardSelected={maxCardSelected}
            />}

        </CardSelectorContext.Provider>
    )
};

export function useCardSelectorContext() {
    return useContext(CardSelectorContext)
}
