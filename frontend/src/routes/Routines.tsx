import { useState } from "react";
import { Button } from "@mui/material";
import RoutineForm from "../components/RoutineForm";
import RoutinesList from "../components/RoutinesList";

export default function Routines() {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm onCancel={() => setIsCreating(false)} method="POST" />
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Routine</Button>
            )}
            <RoutinesList />
        </>
    );
}
