import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import RoutineForm from "../components/RoutineForm";
import RoutinesList from "../components/RoutinesList";
import { routineKeys } from "../api/routines";

export default function Routines() {
    const [isCreating, setIsCreating] = useState(false);
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: routineKeys.all });
        setIsCreating(false);
    };

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm
                    onSuccess={onSuccess}
                    onCancel={() => setIsCreating(false)}
                    method="POST"
                />
            ) : (
                <Button variant="contained" onClick={() => setIsCreating(true)}>
                    New Routine
                </Button>
            )}
            <RoutinesList />
        </>
    );
}
