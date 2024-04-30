import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { smashUltimate } from "../data/smash_ultimate";
import games from "../data/games";
import { useState } from "react";

interface Props {
    game: (typeof games)[number];
}

const inputs = {
    "Smash Ultimate": [
        ...Object.values(smashUltimate.modifiers),
        ...Object.values(smashUltimate.moves),
    ],
    "Tekken 8": [],
    "Streetfighter 6": [],
} as const;

export default function ComboForm({ game }: Props) {
    const { register, control } = useForm();
    const [currentCombo, setCurrentCombo] = useState<string[]>([]);

    const updateCombos = (val: string) => {
        setCurrentCombo((prev) => [...prev, val]);
    };

    const deleteInput = (targetIndex: number) => {
        setCurrentCombo((prev) => prev.filter((_, index) => index !== targetIndex));
    };

    return (
        <div>
            <TextField label="Name" />
            <TextField label="Notes" />
            {currentCombo.map((combo, index) => (
                <Chip key={index} label={combo} onDelete={() => deleteInput(index)} />
            ))}
            <Controller
                name="input"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        id="input"
                        options={inputs[game]}
                        value={value}
                        onChange={(_, newValue) => {
                            onChange(newValue);
                            updateCombos(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Input" />}
                    />
                )}
            />
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Confirm</Button>
        </div>
    );
}
