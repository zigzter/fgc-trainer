import { Autocomplete, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Form from "./Form";
import games from "../data/games";
import { RoutineFormData, routineKeys, upsertRoutine } from "../api/routines";

interface PostProps {
    method: "POST";
}

interface PutProps {
    method: "PUT";
    initialData: RoutineFormData;
    routineId: string;
}

type Props = {
    onCancel: () => void;
    onSuccess: () => void;
} & (PostProps | PutProps);

export default function RoutineForm(props: Props) {
    const { onCancel, method, onSuccess } = props;
    const { register, handleSubmit, control } = useForm<RoutineFormData>({
        defaultValues: method === "PUT" ? props.initialData : undefined,
    });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: upsertRoutine(method, method === "PUT" ? props.routineId : undefined),
        mutationKey: routineKeys.all,
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: routineKeys.all });
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
