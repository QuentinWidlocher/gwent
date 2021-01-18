import { CARD_TYPE } from './cardlist';

export enum BATTLEFIELD_LINE {
    ENEMY_SIEGE,
    ENEMY_RANGED,
    ENEMY_MELEE,
    PLAYER_MELEE,
    PLAYER_RANGED,
    PLAYER_SIEGE,
}

export const PLAYER_LINES = [
    BATTLEFIELD_LINE.PLAYER_MELEE,
    BATTLEFIELD_LINE.PLAYER_RANGED,
    BATTLEFIELD_LINE.PLAYER_SIEGE,
];

export const ENEMY_LINES = [
    BATTLEFIELD_LINE.ENEMY_MELEE,
    BATTLEFIELD_LINE.ENEMY_RANGED,
    BATTLEFIELD_LINE.ENEMY_SIEGE,
];

export const LINES_NAME: Record<BATTLEFIELD_LINE, string> = {
    [BATTLEFIELD_LINE.ENEMY_SIEGE]: 'Siege',
    [BATTLEFIELD_LINE.ENEMY_RANGED]: 'Ranged',
    [BATTLEFIELD_LINE.ENEMY_MELEE]: 'Melee',
    [BATTLEFIELD_LINE.PLAYER_MELEE]: 'Melee',
    [BATTLEFIELD_LINE.PLAYER_RANGED]: 'Ranged',
    [BATTLEFIELD_LINE.PLAYER_SIEGE]: 'Siege',
};

export const CARD_TYPE_NAMES: Record<CARD_TYPE, string> = {
    [CARD_TYPE.MELEE]: 'Melee',
    [CARD_TYPE.RANGED]: 'Ranged',
    [CARD_TYPE.SIEGE]: 'Siege',
    [CARD_TYPE.HERO]: 'Hero',
};

export const CARD_AUTHORIZED_LINES: Record<CARD_TYPE, BATTLEFIELD_LINE[]> = {
    [CARD_TYPE.MELEE]: [BATTLEFIELD_LINE.ENEMY_MELEE, BATTLEFIELD_LINE.PLAYER_MELEE],
    [CARD_TYPE.RANGED]: [BATTLEFIELD_LINE.ENEMY_RANGED, BATTLEFIELD_LINE.PLAYER_RANGED],
    [CARD_TYPE.SIEGE]: [BATTLEFIELD_LINE.ENEMY_SIEGE, BATTLEFIELD_LINE.PLAYER_SIEGE],
    [CARD_TYPE.HERO]: [],
};
