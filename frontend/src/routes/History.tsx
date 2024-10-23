import { useQuery } from "@tanstack/react-query";
import { getRoutineSessions } from "../api/routine_sessions";
import { CircularProgress } from "@mui/material";

export default function History() {
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
                <p>{session.id}</p>
            ))}
        </>
    );
}
