import { TextField } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
    reps: number;
    updateRepsCorrect: UseMutateFunction;
}

export default function ComboAttemptForm({ reps, updateRepsCorrect }: Props) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            reps_done: reps,
            reps_correct: 0,
        },
    });

    const onSubmit = useCallback(
        (data) => {
            updateRepsCorrect(data);
        },
        [updateRepsCorrect],
    );

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSubmit)());
        return () => subscription.unsubscribe();
    }, [onSubmit, handleSubmit, watch]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Reps" {...register("reps_done")} />
            <TextField label="Reps Correct" {...register("reps_correct")} />
        </form>
    );
}
