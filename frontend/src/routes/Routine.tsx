import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RoutineResponse } from "../api/routines";
import { Button } from "@mui/material";
import RoutineForm from "../components/RoutineForm";
import { routineQuery } from "../utils/loaders";

export default function Routine() {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const {
        data: routine,
        isSuccess,
        error,
    } = useQuery<any, Error, RoutineResponse>(routineQuery(params.routineId!));

    console.log({ error });
    if (isSuccess) {
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
}
