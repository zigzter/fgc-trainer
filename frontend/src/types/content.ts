import games from "../data/games";

export interface Character {
    id: string;
    name: string;
}

export interface Game {
    id: string;
    name: string;
    releaseYear: number;
    characters: Character[];
    moves: Record<string, string>;
    modifiers: Record<string, string>;
}

export type GameName = (typeof games)[number];
