export type Input = string;

export interface Combo {
    id: string;
    name: string;
    inputs: Input[];
}

export interface Routine {
    id: string;
    game: string;
    title: string;
    combos: Combo[];
}
