import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import RoutineForm from "../components/RoutineForm";
import { routineQuery } from "../utils/loaders";
import ComboForm from "../components/ComboForm";
import ComboList from "../components/ComboList";

export default function Routine() {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const { data: routine, isPending, isSuccess } = useQuery(routineQuery(params.routineId!));

    if (isPending) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

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
                <ComboList routineId={routine.id} />
                <Button variant="contained">Add Combo</Button>
                <ComboForm game={routine.game} routineId={routine.id} />
            </>
        );
    }
}
