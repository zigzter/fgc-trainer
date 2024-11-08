import { useQuery } from "@tanstack/react-query";
import { Card, CardActionArea, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRoutineSessions, routineSessionKeys } from "../api/routine_sessions";
import { formatDate } from "../utils/formatDate";

export default function History() {
    const navigate = useNavigate();
    const {
        data: history,
        error,
        isError,
        isPending,
    } = useQuery({
        queryKey: routineSessionKeys.all,
        queryFn: getRoutineSessions,
    });

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
            <h1>History</h1>
            {history.map((session) => (
                <Card key={session.id} variant="outlined" sx={{ display: "flex", my: 2 }}>
                    <CardActionArea
                        onClick={() => navigate(`/history/${session.id}`)}
                        sx={{ p: 2 }}
                    >
                        <Typography variant="h5">{session.routine.title}</Typography>
                        <p>{formatDate(session.started_at)}</p>
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
}
