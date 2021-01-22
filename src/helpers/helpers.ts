import { isNil } from 'ramda'
import { Enumeration } from '../types/aliases'

export function notNil<T>(o: T | undefined | null): o is T {
    return !isNil(o)
}

export function enumKeys<T extends Enumeration, K extends keyof T>(enumeration: T): K[] {
    return Object.keys(enumeration) as K[]
}
