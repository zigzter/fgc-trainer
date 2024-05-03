import { Autocomplete, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { smashUltimate } from "../data/smash_ultimate";
import games from "../data/games";
import { ComboFormData, upsertCombo } from "../api/combos";

interface Props {
    game: (typeof games)[number];
    onCancel: () => void;
    initialData?: ComboFormData;
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

export default function ComboForm({ game, routineId, onCancel }: Props) {
    const { register, handleSubmit, control } = useForm<ComboFormData>();

    const mutation = useMutation({
        mutationFn: upsertCombo("POST", routineId),
    });

    const onSubmit = (data: ComboFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Name" {...register("name")} />
            <TextField label="Notes" {...register("notes")} />
            <Controller
                name="inputs"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        id="inputs"
                        multiple
                        freeSolo
                        autoComplete
                        isOptionEqualToValue={() => false}
                        options={inputs[game]}
                        value={value}
                        onChange={(_, newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Input" />}
                    />
                )}
            />
            <Button onClick={onCancel} variant="outlined">
                Cancel
            </Button>
            <LoadingButton loading={mutation.isPending} type="submit" variant="contained">
                Confirm
            </LoadingButton>
        </form>
    );
}
