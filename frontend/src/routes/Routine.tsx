import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoutineResponse, getRoutine } from "../api/routines";
import { Button } from "@mui/material";
import RoutineForm from "../components/RoutineForm";

const routineQuery = (id: string, initialData?: RoutineResponse) => ({
    queryKey: ["routine", id],
    queryFn: async () => getRoutine(id),
    initialData,
});

export const loader =
    (queryClient: QueryClient) =>
    async ({ params }) => {
        const initialData = queryClient
            .getQueryData<RoutineResponse[]>(["routines"])
            ?.find((routine) => routine.id === params.routineId);
        const query = routineQuery(params.routineId, initialData);
        return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    };

export default function Routine() {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const { data: routine, isSuccess } = useQuery<any, Error, RoutineResponse>(
        routineQuery(params.routineId!),
    );

    useEffect(() => {
        console.log(routine);
    }, [routine]);

    if (isSuccess) {
        return (
            <>
                <h1>{routine.title}</h1>
                <p>{routine.game}</p>
                <p>{routine.notes}</p>
                {isEditing ? (
                    <RoutineForm
                        onCancel={() => setIsEditing(false)}
                        method="PUT"
                        initialData={routine}
                        routineId={routine.id}
                    />
                ) : (
                    <>
                        <Button onClick={() => setIsEditing(true)}>Edit Routine</Button>
                    </>
                )}
            </>
        );
    }
}
