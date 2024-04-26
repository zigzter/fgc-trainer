import { Autocomplete, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Form from "./Form";
import games from "../data/games";
import { RoutineError, RoutineFormData, RoutineResponse, upsertRoutine } from "../api/routines";

interface Props {
    onCancel: () => void;
    method: "POST" | "PUT";
    initialData?: RoutineFormData;
}

export default function RoutineForm({ onCancel, method, initialData }: Props) {
    const { register, handleSubmit } = useForm<RoutineFormData>({
        defaultValues: initialData,
    });

    const mutation = useMutation<RoutineResponse, RoutineError, RoutineFormData>({
        mutationFn: upsertRoutine(method),
        mutationKey: ["routines"],
    });

    const onSubmit = (data: RoutineFormData) => {
        mutation.mutate(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Autocomplete
                options={games}
                renderInput={(params) => (
                    <TextField {...params} label="Game" {...register("game")} />
                )}
            />
            <TextField label="Title" {...register("title")} />
            <TextField label="Notes" {...register("notes")} />
            <Button variant="outlined" onClick={onCancel}>
                Cancel
            </Button>
            <LoadingButton variant="contained" type="submit">
                Create
            </LoadingButton>
        </Form>
    );
}
