import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import RoutineForm from "../components/RoutineForm";
import { routineQuery } from "../utils/loaders";

export default function Routine() {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const { data: routine, error, isPending, isError } = useQuery(routineQuery(params.routineId!));

    if (isPending) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <h1>{routine.title}</h1>
            <p>{routine.game}</p>
            <p>{routine.notes}</p>
            {isEditing ? (
                <RoutineForm
                    onCancel={() => setIsEditing(false)}
                    method="PUT"
                    initialData={routine}
                    routineId={routine.id}
                />
            ) : (
                <>
                    <Button onClick={() => setIsEditing(true)}>Edit Routine</Button>
                </>
            )}
        </>
    );
}
