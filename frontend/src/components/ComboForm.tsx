import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { smashUltimate } from "../data/smash_ultimate";
import games from "../data/games";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { upsertCombo } from "../api/combos";
import { LoadingButton } from "@mui/lab";

interface Props {
    game: (typeof games)[number];
    routineId?: string;
}

const inputs = {
    "Smash Ultimate": [
        ...Object.values(smashUltimate.modifiers),
        ...Object.values(smashUltimate.moves),
    ],
    "Tekken 8": [],
    "Streetfighter 6": [],
} as const;

export default function ComboForm({ game, routineId }: Props) {
    const { register, handleSubmit, control } = useForm();
    const [currentCombo, setCurrentCombo] = useState<string[]>([]);

    const mutation = useMutation({
        mutationFn: upsertCombo("POST", routineId),
    });

    const updateCombos = (val: string) => {
        setCurrentCombo((prev) => [...prev, val]);
    };

    const deleteInput = (targetIndex: number) => {
        setCurrentCombo((prev) => prev.filter((_, index) => index !== targetIndex));
    };

    const onSubmit = (data) => {
        mutation.mutate({ ...data, inputs: currentCombo });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Name" {...register("name")} />
            <TextField label="Notes" {...register("notes")} />
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
            <LoadingButton loading={mutation.isPending} type="submit" variant="contained">
                Confirm
            </LoadingButton>
        </form>
    );
}
