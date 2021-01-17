import { Card } from "../../../models/card"
import styles from "./Card.module.css"

export interface CardProps {
    card: Card
}

export function CardComponent(props: CardProps) {
    return (
        <div className={styles.card}>
            <h1 className={styles.title}>{props.card.title}</h1>
        </div>
    )
}