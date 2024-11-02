import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import { getRoutine } from "../api/routines";
import { getCombos } from "../api/combos";
import { getActiveRoutineSession, updateRoutineSession } from "../api/routine_sessions";

export default function RoutineSession() {
    const location = useLocation();
    const [session, setSession] = useState(location.state?.session || null);

    const active = useQuery({
        queryKey: ["routine_session"],
        queryFn: getActiveRoutineSession,
    });
    const routine = useQuery({
        queryKey: ["routine"],
        queryFn: () => getRoutine(session.routine_id),
    });
    const combos = useQuery({
        queryKey: ["combos"],
        queryFn: () => getCombos(session.routine_id),
    });

    const mutation = useMutation({
        mutationFn: () =>
            updateRoutineSession({
                ...session,
                completed: true,
                completed_at: new Date().toISOString().toString(),
            }),
    });

    const handleComplete = () => {
        mutation.mutate();
    };

    useEffect(() => {
        if (!session) {
            active.refetch();
        }
    }, [session, active]);

    useEffect(() => {
        if (active.isSuccess) {
            setSession(active.data);
        }
    }, [active.isFetching, active.isSuccess, active.data]);

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
            <Button onClick={handleComplete}>Complete</Button>
        </div>
    );
}
