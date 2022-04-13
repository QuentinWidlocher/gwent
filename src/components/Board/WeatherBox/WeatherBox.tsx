import React, { FC } from 'react'
import { cardToComponent } from '../../../helpers/cards'
import { PlacedCard } from '../../../types/card'
import styles from './WeatherBox.module.css'

export type WeatherBoxProps = {
    cards: PlacedCard[]
}

export const WeatherBoxComponent: FC<WeatherBoxProps> = (props) => {

	return (
		<div className={styles.weatherBox}>
			{props.cards.map(cardToComponent)}
		</div>
	)
}