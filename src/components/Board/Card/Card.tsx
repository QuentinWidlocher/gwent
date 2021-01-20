import { Card, isPlacedCard, PlacedCard } from "../../../models/card"
import { CARD_TYPE } from "../../../models/cardlist"
import { CARD_TYPE_NAMES, PLACED_CARD_TYPE_NAMES } from "../../../models/constants"
import styles from "./Card.module.css"

export interface CardProps {
    card: Card
    canBeSelected?: boolean
    selected?: boolean
    onClick?: () => void
}

export function CardComponent(props: CardProps) {

    function onClick() {
        if (!!props.onClick) {
            props.onClick()
        }
    }

    return (
        <div
            className={[
                (styles.card),
                (props.canBeSelected ? styles.selectable : ''),
                (props.selected ? styles.selected : ''),
            ].join(' ')}
            onClick={onClick}
        >
            <h1 className={styles.strength}>{isPlacedCard(props.card) ? props.card.strength : null}</h1>
            <h1 className={styles.title}>{props.card.title}</h1>
            <h2 className={styles.type}>{
                isPlacedCard(props.card) ? 
                    props.card.unitTypes.map(type => PLACED_CARD_TYPE_NAMES[type]).join('/')
                    : null
                }</h2>
        </div>
    )
}