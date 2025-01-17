import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { RoutineResponse, getRoutine, routineKeys } from "../api/routines";

export const routineQuery = (id: string, initialData?: RoutineResponse) => ({
    queryKey: routineKeys.details(id),
    queryFn: async () => getRoutine(id),
    initialData,
});

export const routineLoader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
        if (!params.routineId) {
            throw new Error("Missing routine ID");
        }
        const initialData = queryClient
            .getQueryData<RoutineResponse[]>(routineKeys.all)
            ?.find((routine) => routine.id === params.routineId);
        const query = routineQuery(params.routineId, initialData);
        return queryClient.ensureQueryData(query);
    };

export async function rootLoader() {
    return {};
}
