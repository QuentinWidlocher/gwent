
import { PLACED_CARD_TYPE_NAMES } from "../../../constants/constants"
import { getStrength, canBePlaced, cardIsPlaced } from "../../../helpers/cards"
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

    let cardStrength = null
    let cardTypes = null
    let cardHasBonus = false
    let cardHasMalus = false

    if (canBePlaced(props.card)) {
        cardStrength = getStrength(props.card)
        cardTypes = props.card.unitTypes.map(type => PLACED_CARD_TYPE_NAMES[type]).join('/')

        let cardOriginalStrength = props.card.originalStrength

        let cardModifiers = (props.card.appliedModifiers ?? [])

        cardHasBonus = cardModifiers.length > 0 && (cardModifiers.every(m => m.positive) || cardStrength > cardOriginalStrength)
        cardHasMalus = cardModifiers.length > 0 && (cardModifiers.every(m => !m.positive) || cardStrength < cardOriginalStrength)
    }

    let strength = (
        <h2 className={[
            styles.strength,
            (cardHasBonus ? styles.bonus : ''),
            (cardHasMalus ? styles.malus : ''),
        ].join(' ')}>
            {cardStrength}
        </h2>
    )

    return (
        <div
            className={[
                (styles.card),
                (props.canBeSelected ? styles.selectable : ''),
                (props.selected ? styles.selected : ''),
                (cardIsPlaced(props.card) && props.card.isHero ? styles.hero : ''),
            ].join(' ')}
            onClick={() => notNil(props.onClick) && props.onClick()}
        >
            {cardIsPlaced(props.card) && strength}

            <h1 className={styles.title}>{(props.card.appliedModifiers ?? []).length > 0 && '*'} {props.card.title}</h1>
            <h2 className={styles.type}>{cardTypes}</h2>
        </div>
    )
}