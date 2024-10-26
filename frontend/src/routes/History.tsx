import { useQuery } from "@tanstack/react-query";
import { Card, CardActionArea, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRoutineSessions } from "../api/routine_sessions";

export default function History() {
    const navigate = useNavigate();
    const {
        data: history,
        error,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["history"],
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
                    <CardActionArea onClick={() => navigate(`/history/${session.id}`)}>
                        <h2>{session.started_at}</h2>
                        <p>{session.id}</p>
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
}
