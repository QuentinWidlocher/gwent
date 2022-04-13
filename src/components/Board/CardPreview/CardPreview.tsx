import React from 'react'
import { notNil } from '../../../helpers/helpers'
import { Card } from '../../../types/card'
import styles from './CardPreview.module.css'

export type CardPreviewProps = {
    card: Card | null
    className?: string
    onClick?: (card: Card) => void
}

export function CardPreviewComponent(props: CardPreviewProps) {
	const card = props.card
	if (notNil(card)) {
		const cardStyle = { '--cardUrl': `url(${card.imageUrl})` } as React.CSSProperties

		return <div
			style={cardStyle}
			className={`${styles.cardPreview} ${props.className ?? ''}`}
			onClick={() => !!props.onClick && props.onClick(card)}
		>
			{/* 
					we put an image inside the div so we can display the image as background-image
					while keeping the right image size. Using background-image allow us to add a
					nice hover color with background-blend-mode without making the image transparent
			*/}
			<img
				src={card.imageUrl}
				alt={card.title}
			/>
		</div>
	} else {
		return null
	}
}