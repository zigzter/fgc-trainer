export type Input = string;

export interface Combo {
    id: string;
    name: string;
    inputs: Input[];
    notes: string;
}

export interface Routine {
    userId: string;
    game: string;
    title: string;
    combos: Combo[];
    notes: string;
}
