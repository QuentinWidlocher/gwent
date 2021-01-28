import { BATTLEFIELD_LINE } from "../../../constants/constants"
import { getLineStrength } from "../../../helpers/battlefield"
import { notNil } from "../../../helpers/helpers"
import { BattlefieldLine } from "../../../types/aliases"
import { PlacedCard } from "../../../types/card"
import styles from "./Battlefield.module.css"
import { BattlefieldLineComponent } from "./BattlefieldLine/BattlefieldLine"

export type BattlefieldProps = {
    enemySiegeLine: BattlefieldLine,
    enemyRangedLine: BattlefieldLine,
    enemyMeleeLine: BattlefieldLine,
    playerMeleeLine: BattlefieldLine,
    playerRangedLine: BattlefieldLine,
    playerSiegeLine: BattlefieldLine,

    onCardClick: (lineType: BATTLEFIELD_LINE, card: PlacedCard) => void,
    onLineClick: (lineType: BATTLEFIELD_LINE) => void,
    onBoardClick: () => void,

    cardsCanBeSelected: boolean,
    linesCanBeSelected: boolean,
    battlefieldCanBeSelected: boolean,

    selectableLines: BATTLEFIELD_LINE[] | null,
}

type LineConfig = { type: BATTLEFIELD_LINE, style: string, cards: PlacedCard[], canBeSelected: boolean }

export function BattlefieldComponent(props: BattlefieldProps) {

    const linesConfig: LineConfig[] = [
        { type: BATTLEFIELD_LINE.ENEMY_SIEGE, style: styles.enemySiegeLine, cards: props.enemySiegeLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.ENEMY_SIEGE) },
        { type: BATTLEFIELD_LINE.ENEMY_RANGED, style: styles.enemyRangedLine, cards: props.enemyRangedLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.ENEMY_RANGED) },
        { type: BATTLEFIELD_LINE.ENEMY_MELEE, style: styles.enemyMeleeLine, cards: props.enemyMeleeLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.ENEMY_MELEE) },
        { type: BATTLEFIELD_LINE.PLAYER_MELEE, style: styles.playerMeleeLine, cards: props.playerMeleeLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.PLAYER_MELEE) },
        { type: BATTLEFIELD_LINE.PLAYER_RANGED, style: styles.playerRangedLine, cards: props.playerRangedLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.PLAYER_RANGED) },
        { type: BATTLEFIELD_LINE.PLAYER_SIEGE, style: styles.playerSiegeLine, cards: props.playerSiegeLine, canBeSelected: canLineBeSelected(BATTLEFIELD_LINE.PLAYER_SIEGE) },
    ]

    function canLineBeSelected(lineType: BATTLEFIELD_LINE) {
        return props.linesCanBeSelected && (props.selectableLines?.includes(lineType) ?? false)
    }

    function onLineClick(lineType: BATTLEFIELD_LINE, card?: PlacedCard) {
        console.debug(card)
        if (notNil(card)) {
            props.onCardClick(lineType, card)
        } else {
            props.onLineClick(lineType)
        }
    }

    let lines = linesConfig.map((line, i) => (
        <div className={line.style} key={`battlefield_line_${i}`}>
            <BattlefieldLineComponent
                cards={line.cards}
                type={line.type}
                totalStrength={getLineStrength(line.cards)}
                canBeSelected={line.canBeSelected}
                selectCard={props.cardsCanBeSelected}
                dark={i % 2 == 0}
                onClick={(card) => onLineClick(line.type, card)}
            />
        </div>
    ))

    return (
        <div className={styles.battlefield}>
            <div
                className={props.battlefieldCanBeSelected ? styles.selection : ''}
                onClick={() => props.battlefieldCanBeSelected && props.onBoardClick()}
            ></div>

            {lines}
        </div>
    )
}