import * as games from '../constants/games/';

/**
 * A single input. e.g. A, X, up, triangle, quarter-circle right
 */
export interface Input {
    name: string;
    type: 'button' | 'direction' | 'modifier';
}

/**
 * A single move made up of several button presses.
 * @example Y -> down -> A
 */
export interface Move {
    id: string;
    inputs: Input[];
}

/**
 * A combination of moves.
 * @example Y -> down -> A to right -> Y -> back -> A
 */
export interface Chain {
    id: string;
    moves: Move[];
}

/**
 * A full routine consisting of an array of combos/chains to practice
 * @example [nair flipkick, zair boostkick, nair fair flipkick]
 */
export interface Routine {
    name: string;
    id: string;
    chains: Chain[];
}

export interface ChainPayload {
    moves: Move[];
    id: string;
    routineId: string;
    createdAt: string;
}

export interface RoutinePayload extends Routine {
    createdAt: string;
}
