import { append, without } from 'ramda'
import React, { ReactNode, useContext, useRef, useState } from 'react'
import { notNil } from '../../../helpers/helpers'
import { Card } from '../../../types/card'
import { CardPreviewComponent } from '../CardPreview/CardPreview'
import styles from './CardSelector.module.css'

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
			<div className={styles.cardList}>
				{props.cardList.map(card => {

					const cardIsSelected = selectedCardIds.includes(card.id)

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
			</div>
			<button
				onClick={() => props.onCardsSelected(getSelectedCards())}
				disabled={selectedCardIds.length < props.maxCardSelected}
			>
				{
					(selectedCardIds.length < props.maxCardSelected)
						? `Select ${props.maxCardSelected} cards`
						: `Confirm the selection of ${selectedCardIds.length} cards`
				}
			</button>
		</div>
	)
}

export type CardSelectorContextProps = { show: () => Promise<Card[]>, setCardList: (card: Card[]) => void, setMaxCardSelected: (value: number) => void }

const CardSelectorContext = React.createContext<CardSelectorContextProps>({
	show: () => Promise.resolve([]),
	setCardList: () => { return },
	setMaxCardSelected: () => { return },
})

export function CardSelectorContextProvider(props: { children?: ReactNode | undefined }) {
	const [showCardSelector, setShowCardSelector] = useState(false)
	const [cardList, setCardList] = useState<Card[]>([])
	const [maxCardSelected, setMaxCardSelected] = useState(1)
	const resolver = useRef<(cards: Card[]) => void>()

	function handleShow() {
		setShowCardSelector(true)

		// prepare the resolver to resolve the returned promise with selected cards
		return new Promise<Card[]>(resolve => {
			resolver.current = resolve
		})
	}


	function onCardsSelected(cards: Card[]) {
		resolver.current && resolver.current(cards)
		setShowCardSelector(false)
	}

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
}

export function useCardSelectorContext() {
	return useContext(CardSelectorContext)
}
