import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoutineResponse, deleteRoutine, getRoutine } from "../api/routines";
import { Button } from "@mui/material";
import RoutineForm from "../components/RoutineForm";

const routineQuery = (id: string) => ({
    queryKey: ["routine", id],
    queryFn: async () => getRoutine(id),
});

export const loader =
    (queryClient: QueryClient) =>
    async ({ params }) => {
        const query = routineQuery(params.routineId);
        return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    };

export default function Routine() {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const { data: routine, isSuccess } = useQuery<any, Error, RoutineResponse>(
        routineQuery(params.routineId!),
    );
    const { isPending, mutate } = useMutation({
        mutationFn: () => deleteRoutine(routine!.id),
    });

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
                        <Button onClick={() => mutate()} color="error">
                            Delete
                        </Button>
                    </>
                )}
            </>
        );
    }
}
