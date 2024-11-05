import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface Props {
    reps: number;
    updateRepsCorrect: () => void;
}

export default function ComboAttemptForm({ reps, updateRepsCorrect }: Props) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            reps_done: reps,
            reps_correct: 0,
        },
    });

    const onSubmit = () => {
        updateRepsCorrect();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Reps" {...register("reps_done")} />
            <TextField label="Reps Correct" {...register("reps_correct")} />
        </form>
    );
}
