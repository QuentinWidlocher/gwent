
import { notNil } from "../../../helpers/helpers"
import { Card } from "../../../types/card"
import styles from './CardPreview.module.css'

export interface CardPreviewProps {
    card: Card | null
}

export function CardPreviewComponent(props: CardPreviewProps) {
    if (notNil(props.card)) {
        return <img
            src={props.card.imageUrl}
            alt={props.card.title}
            className={styles.cardPreview}
        />
    } else {
        return null
    }
}