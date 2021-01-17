import { Card } from "../../../models/card"
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
            <h1 className={styles.title}>{props.card.title}</h1>
        </div>
    )
}