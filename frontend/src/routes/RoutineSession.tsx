import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CircularProgress, TextField, Typography } from "@mui/material";
import {
    RoutineSessionResponse,
    getActiveRoutineSession,
    updateRoutineSession,
} from "../api/routine_sessions";

export default function RoutineSession() {
    const location = useLocation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [session, setSession] = useState<RoutineSessionResponse>(location.state?.session || null);

    const active = useQuery({
        queryKey: ["routine_session"],
        queryFn: getActiveRoutineSession,
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
        queryClient.invalidateQueries({ queryKey: ["routine_session"] });
        // TODO: gracefully handle undefined data, if a possibility
        navigate(`/history/${session.id}`);
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

    if (active.isPending || !session) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h4">{session.routine.title}</Typography>
            {session.routine.combos.map((combo) => (
                <Card key={combo.id}>
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
