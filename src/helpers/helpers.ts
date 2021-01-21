import { isNil } from 'ramda';

export function notNil<T>(o: T | undefined | null): o is T {
    return !isNil(o);
}
