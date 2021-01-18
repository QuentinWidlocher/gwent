import { Card } from "../../../models/card"
import { CARD_TYPE_NAMES, LINES_NAME } from "../../../models/constants"
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
        <div className={`
            ${styles.card}
            ${props.canBeSelected ? styles.selectable : ''}
            ${props.selected ? styles.selected : ''}
        `} onClick={onClick}>
            <h1 className={styles.strength}>{props.card.strength}</h1>
            <h1 className={styles.title}>{props.card.title}</h1>
            <h2 className={styles.type}>{CARD_TYPE_NAMES[props.card.type]}</h2>
        </div>
    )
}