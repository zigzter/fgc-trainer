import { Autocomplete, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Form from "./Form";
import games from "../data/games";
import { RoutineError, RoutineFormData, RoutineResponse, upsertRoutine } from "../api/routines";

interface Props {
    onCancel: () => void;
    method: "POST" | "PUT";
    initialData?: RoutineFormData;
    routineId?: string;
}

export default function RoutineForm({ onCancel, method, initialData, routineId }: Props) {
    const { register, handleSubmit, control } = useForm<RoutineFormData>({
        defaultValues: initialData,
    });
    const queryClient = useQueryClient();

    const mutation = useMutation<RoutineResponse, RoutineError, RoutineFormData>({
        mutationFn: upsertRoutine(method, routineId),
        mutationKey: ["routines"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["routines"] });
        },
    });

    const onSubmit = (data: RoutineFormData) => {
        mutation.mutate(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="game"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        id="game"
                        options={games}
                        value={value}
                        onChange={(_, newValue) => onChange(newValue)}
                        renderInput={(params) => <TextField {...params} label="Game" />}
                    />
                )}
            />
            <TextField label="Title" {...register("title")} />
            <TextField label="Notes" {...register("notes")} />
            <Button variant="outlined" onClick={onCancel}>
                Cancel
            </Button>
            <LoadingButton loading={mutation.isPending} variant="contained" type="submit">
                {method === "POST" ? "Create" : "Update"}
            </LoadingButton>
        </Form>
    );
}
