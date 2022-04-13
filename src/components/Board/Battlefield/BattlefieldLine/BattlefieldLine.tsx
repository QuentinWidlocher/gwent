import React from 'react'
import { BATTLEFIELD_LINE, CARD_TYPE } from '../../../../constants/constants'
import { WEATHER_MODIFIER } from '../../../../constants/modifiers'
import { cardToComponent } from '../../../../helpers/cards'
import { notNil } from '../../../../helpers/helpers'
import { PlacedCard } from '../../../../types/card'
import { CardComponent } from '../../Card/Card'
import styles from './BattlefieldLine.module.css'

export type BattlefieldLineProps = {
    cards: PlacedCard[],
    type: BATTLEFIELD_LINE,
    totalStrength: number
    dark?: boolean,
    selectCard?: boolean,
    canBeSelected?: boolean,
    onClick?: (card?: PlacedCard) => void,
}

export function BattlefieldLineComponent(props: BattlefieldLineProps) {

	const modifiers = props.cards.filter(card => (card.type == CARD_TYPE.MODIFIER) && (card.modifier != WEATHER_MODIFIER))
	const cards = props.cards.filter(card => card.type == CARD_TYPE.PLACED)

	return (
		<div
			className={[
				(styles.line),
				(props.dark ? styles.dark : ''),
				(props.canBeSelected && !props.selectCard ? styles.canBeSelected : ''),
			].join(' ')}
			onClick={() => !props.selectCard && notNil(props.onClick) && props.onClick()}
		>
			<span className={styles.strength}>{props.totalStrength}</span>
			<div className={styles.modifiers}>
				{modifiers.map(cardToComponent)}
			</div>
			<div className={styles.cards}>
				{cards.map((card, index) => (
					<CardComponent 
						card={card} 
						key={`${card.id}-#${index}`} 
						canBeSelected={props.selectCard}
						onClick={() => (props.selectCard && props.onClick) && props.onClick(card)}
					/>
				))}
			</div>
		</div>
	)
}