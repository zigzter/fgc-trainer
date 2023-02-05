'use client';
import { useSelectStore } from '@/store';
import { useState } from 'react';
import * as games from '../../constants/games/';

const gameTitles = Object.values(games).map((game) => game.title);

export default function MyListbox() {
    const [selectedGame, setSelectedGame] = useState('');
    const setGame = useSelectStore((state) => state.setGame);
    const onSubmit = () => {
        setGame(selectedGame);
    };

    return (
        <>
            <h1>Pick your game</h1>
            <select onChange={(event) => setSelectedGame(event.target.value)} className="select w-full max-w-xs">
                {gameTitles.map((gameTitle) => (
                    <option key={gameTitle}>{gameTitle}</option>
                ))}
            </select>
            <button className="btn btn-primary" onClick={onSubmit}>
                Select Game
            </button>
        </>
    );
}
