import { useQuery } from "@tanstack/react-query";
import { getRoutineSession } from "../api/routine_sessions";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

export default function SessionDetails() {
    const params = useParams();
    const {
        data: details,
        error,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["session_details"],
        queryFn: () => getRoutineSession(params.sessionId!),
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

    return <h1>{details.routine_id}</h1>;
}
