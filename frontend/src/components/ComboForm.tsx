import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: () => void;
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
    const { game, routineId, onCancel, method, onSuccess } = props;
    const queryClient = useQueryClient();
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
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ["combos"] });
        },
    });

    const onSubmit = (data: ComboFormData) => {
        mutation.mutate(data);
    };

    return (
        <Paper sx={{ p: 2, my: 2, "& .MuiTextField-root, .MuiButton-root": { m: 1 } }}>
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
                <div>
                    <Button onClick={onCancel} variant="outlined">
                        Cancel
                    </Button>
                    <LoadingButton loading={mutation.isPending} type="submit" variant="contained">
                        Confirm
                    </LoadingButton>
                </div>
            </form>
        </Paper>
    );
}
