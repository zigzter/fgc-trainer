import { TextField } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Data {
    reps_done: string;
    reps_correct: string;
}

interface Props {
    reps: string;
    updateRepsCorrect: (data: Data) => void;
}

export default function ComboAttemptForm({ reps, updateRepsCorrect }: Props) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            reps_done: reps,
            reps_correct: "0",
        },
    });

    const onSubmit = useCallback(
        (data: Data) => {
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
