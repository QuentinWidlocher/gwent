
import { PLACED_CARD_TYPE_NAMES } from "../../../constants/constants"
import { getStrength, isPlacedCard } from "../../../helpers/cards"
import { notNil } from "../../../helpers/helpers"
import { Card } from "../../../types/card"
import styles from "./Card.module.css"

export interface CardProps {
    card: Card
    canBeSelected?: boolean
    selected?: boolean
    onClick?: () => void
}

export function CardComponent(props: CardProps) {

    return (
        <div
            className={[
                (styles.card),
                (props.canBeSelected ? styles.selectable : ''),
                (props.selected ? styles.selected : ''),
            ].join(' ')}
            onClick={() => notNil(props.onClick) && props.onClick()}
        >
            <h1 className={styles.strength}>{
                isPlacedCard(props.card)
                    ? getStrength(props.card)
                    : null
            }</h1>
            <h1 className={styles.title}>{props.card.title}</h1>
            <h2 className={styles.type}>{
                isPlacedCard(props.card)
                    ? props.card.unitTypes.map(type => PLACED_CARD_TYPE_NAMES[type]).join('/')
                    : null
            }</h2>
        </div>
    )
}