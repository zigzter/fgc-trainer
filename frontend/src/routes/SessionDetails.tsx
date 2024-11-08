import { useQuery } from "@tanstack/react-query";
import { getRoutineSession, routineSessionKeys } from "../api/routine_sessions";
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
        queryKey: routineSessionKeys.details(params.sessionId!),
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

    return <h1>{details.routine.title}</h1>;
}
