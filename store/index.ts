import { create } from 'zustand';

interface SelectionState {
    character: string;
    game: string;
    setCharacter: (character: string) => void;
    setGame: (game: string) => void;
}

export const useSelectStore = create<SelectionState>()((set) => ({
    character: '',
    game: '',
    routines: [],
    setCharacter: (character) => set({ character: character }),
    setGame: (game) => set({ game }),
}));
