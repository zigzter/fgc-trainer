import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Card, CircularProgress, TextField, Typography } from "@mui/material";
import { getRoutine } from "../api/routines";
import { getCombos } from "../api/combos";

export default function RoutineSession() {
    const location = useLocation();
    const routine = useQuery({
        queryKey: ["routine"],
        queryFn: () => getRoutine(routineId),
    });

    const combos = useQuery({
        queryKey: ["combos"],
        queryFn: () => getCombos(routineId),
    });

    const routineId = location.state.routineId;
    if (!routineId) {
        return <p>Missing routine ID.</p>;
    }

    if (combos.isPending || routine.isPending) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (combos.isError) {
        return <p>{combos.error.message}</p>;
    }

    if (routine.isError) {
        return <p>{routine.error.message}</p>;
    }

    return (
        <div>
            <Typography variant="h4">{routine.data.title}</Typography>
            {combos.data.map((combo) => (
                <Card>
                    <p>
                        {combo.name}: {combo.reps}
                    </p>
                    <form>
                        <TextField label="Attempts" inputMode="numeric" />
                        <TextField label="Attempts correct" inputMode="numeric" />
                    </form>
                    {combo.notes && <p>Notes: {combo.notes}</p>}
                </Card>
            ))}
        </div>
    );
}
