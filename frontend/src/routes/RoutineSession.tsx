import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import {
    getActiveRoutineSession,
    routineSessionKeys,
    updateRoutineSession,
} from "../api/routine_sessions";
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
        queryKey: routineSessionKeys.all,
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
        onError: (err) => {
            console.error(err);
        },
    });

    const handleComplete = () => {
        completeSessionMutation.mutate();
        queryClient.invalidateQueries({ queryKey: routineSessionKeys.all });
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
                        // TODO: Properly set types
                        reps={String(combo.reps)}
                        updateRepsCorrect={(data) => {
                            updateComboAttemptMutation.mutate({ ...data, id: combo.id });
                        }}
                    />
                    {combo.notes && <p>Notes: {combo.notes}</p>}
                </Card>
            ))}
            <Button onClick={handleComplete}>Complete</Button>
        </div>
    );
}
