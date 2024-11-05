import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import { getActiveRoutineSession, updateRoutineSession } from "../api/routine_sessions";
import ComboAttemptForm from "../components/ComboAttemptForm";
import { updateComboAttempts } from "../api/combo_attempts";

export default function RoutineSession() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        data: session,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["routine_session"],
        queryFn: getActiveRoutineSession,
        retry: (count, error) => {
            if (error.message === "Not Found") {
                return false;
            }
            return count < 3;
        },
    });

    const completeSessionMutation = useMutation({
        mutationFn: () =>
            updateRoutineSession({
                id: session!.id,
                completed: true,
                completed_at: new Date().toISOString().toString(),
            }),
        onSuccess: () => {
            navigate(`/history/${session!.id}`);
        },
    });

    const updateComboAttemptMutation = useMutation({
        mutationFn: updateComboAttempts,
    });

    const handleComplete = () => {
        completeSessionMutation.mutate();
        queryClient.invalidateQueries({ queryKey: ["routine_session"] });
    };

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
        <div>
            <Typography variant="h4">{session.routine.title}</Typography>
            {session.routine.combos.map((combo) => (
                <Card key={combo.id}>
                    <p>
                        {combo.name}: {combo.reps}
                    </p>
                    <ComboAttemptForm
                        reps={combo.reps}
                        updateRepsCorrect={updateComboAttemptMutation.mutate}
                    />
                    {combo.notes && <p>Notes: {combo.notes}</p>}
                </Card>
            ))}
            <Button onClick={handleComplete}>Complete</Button>
        </div>
    );
}
