import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoutine } from "../api/routines";

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
    const params = useParams();
    const { data: routine, isSuccess } = useQuery(routineQuery(params.routineId!));
    useEffect(() => {
        console.log(routine);
    }, [routine]);
    if (isSuccess) {
        return (
            <>
                <h1>{routine.title}</h1>
                <p>{routine.game}</p>
                <p>{routine.notes}</p>
            </>
        );
    }
}
