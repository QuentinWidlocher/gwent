import React from 'react'
import { canBePlaced, cardIsPlaced, getStrength } from '../../../helpers/cards'
import { notNil } from '../../../helpers/helpers'
import { Card } from '../../../types/card'
import styles from './Card.module.css'

export type CardProps = {
    card: Card
    canBeSelected?: boolean
    selected?: boolean
    onClick?: () => void
}

export function CardComponent(props: CardProps) {

	let cardStrength = null
	let cardHasBonus = false
	let cardHasMalus = false

	if (canBePlaced(props.card)) {
		cardStrength = getStrength(props.card)

		const cardOriginalStrength = props.card.originalStrength

		const cardModifiers = (props.card.appliedModifiers ?? [])

		cardHasBonus = cardModifiers.length > 0 && (cardModifiers.every(m => m.positive) || cardStrength > cardOriginalStrength)
		cardHasMalus = cardModifiers.length > 0 && (cardModifiers.every(m => !m.positive) || cardStrength < cardOriginalStrength)
	}

	const strength = (
		<h2 className={[
			styles.strength,
			(cardHasBonus ? styles.bonus : ''),
			(cardHasMalus ? styles.malus : ''),
		].join(' ')}>
			{cardStrength}
		</h2>
	)

	const cardStyle = { '--cardUrl': `url(${props.card.imageUrl})` } as React.CSSProperties

	return (
		<div
			className={[
				(styles.card),
				(props.canBeSelected ? styles.selectable : ''),
				(props.selected ? styles.selected : ''),
				(cardIsPlaced(props.card) && props.card.isHero ? styles.hero : ''),
			].join(' ')}
			style={cardStyle}
			onClick={() => notNil(props.onClick) && props.onClick()}
		>
			{cardIsPlaced(props.card) && strength}
		</div>
	)
}