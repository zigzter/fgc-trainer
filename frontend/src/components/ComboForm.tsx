import { Autocomplete, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { smashUltimate } from "../data/smash_ultimate";
import { ComboFormData, ComboResponse, upsertCombo } from "../api/combos";
import { GameName } from "../types/content";

interface PostProps {
    method: "POST";
}

interface PutProps {
    method: "PUT";
    initialData: ComboResponse;
}

type Props = {
    game: GameName;
    onCancel: () => void;
    routineId: string;
} & (PostProps | PutProps);

const inputs = {
    "Smash Ultimate": [
        ...Object.values(smashUltimate.modifiers),
        ...Object.values(smashUltimate.moves),
    ],
    "Tekken 8": [],
    "Streetfighter 6": [],
} as const;

export default function ComboForm(props: Props) {
    const { game, routineId, onCancel, method } = props;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ComboFormData>({ defaultValues: method === "PUT" ? props.initialData : undefined });

    const mutation = useMutation({
        mutationFn: upsertCombo(
            method,
            routineId,
            method === "PUT" ? props.initialData.id : undefined,
        ),
    });

    const onSubmit = (data: ComboFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", { required: "Name is required" })}
            />
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
                        // Allow duplicates
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
            <TextField
                label="Reps"
                inputMode="numeric"
                error={!!errors.reps}
                helperText={errors.reps?.message}
                {...register("reps", { valueAsNumber: true, validate: (val) => val > 0 })}
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
