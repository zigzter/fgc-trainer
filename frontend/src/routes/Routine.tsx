import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, Divider } from "@mui/material";
import RoutineForm from "../components/RoutineForm";
import { routineQuery } from "../utils/loaders";
import ComboForm from "../components/ComboForm";
import ComboList from "../components/ComboList";
import { createRoutineSession } from "../api/routine_sessions";

export default function Routine() {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingCombo, setIsAddingCombo] = useState(false);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.edit) {
            setIsEditing(true);
        }
    }, [location.state]);

    const routineId = params.routineId; // var assignment to deal with TS narrowing weirdness
    // TODO: Is throwing the best option here?
    if (!routineId) {
        throw new Error("Missing routine ID");
    }

    const { data: routine, isPending, isSuccess } = useQuery(routineQuery(routineId));
    const mutation = useMutation({
        mutationFn: () => createRoutineSession(routineId),
        onSuccess: () => {
            navigate("/session");
        },
    });

    const handleRoutineStart = () => {
        mutation.mutate();
    };

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
                {isEditing ? (
                    <RoutineForm
                        onCancel={() => setIsEditing(false)}
                        onSuccess={() => setIsEditing(false)}
                        method="PUT"
                        initialData={routine}
                        routineId={routine.id}
                    />
                ) : (
                    <>
                        <h1>{routine.title}</h1>
                        <p>{routine.game}</p>
                        <p>{routine.notes}</p>
                        <Button variant="outlined" onClick={() => setIsEditing(true)}>
                            Edit Routine
                        </Button>
                    </>
                )}
                <Divider sx={{ my: 2 }} />
                <ComboList routineId={routine.id} game={routine.game} />
                {isAddingCombo ? (
                    <ComboForm
                        onCancel={() => setIsAddingCombo(false)}
                        onSuccess={() => setIsAddingCombo(false)}
                        game={routine.game}
                        routineId={routine.id}
                        method="POST"
                    />
                ) : (
                    <>
                        <Button onClick={() => setIsAddingCombo(true)} variant="contained">
                            Add Combo
                        </Button>
                        <Button onClick={handleRoutineStart} variant="contained">
                            Start Routine
                        </Button>
                    </>
                )}
            </>
        );
    }
}
