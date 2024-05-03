import { Card, CardActionArea, CardActions, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoutine, getRoutines } from "../api/routines";
import PopupMenu from "./PopupMenu";

export default function RoutinesList() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        data: routines,
        error,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["routines"],
        queryFn: getRoutines,
    });

    const mutation = useMutation({
        mutationFn: (id: string) => deleteRoutine(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["routines"] });
        },
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

    return routines.map((routine) => (
        <Card key={routine.id} variant="outlined" sx={{ display: "flex", my: 2 }}>
            <CardActionArea onClick={() => navigate(`/routines/${routine.id}`)} sx={{ p: 2 }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {routine.game}
                </Typography>
                <Typography variant="h5">{routine.title}</Typography>
            </CardActionArea>
            <CardActions>
                <PopupMenu
                    onDelete={() => mutation.mutate(routine.id)}
                    onEdit={() => navigate(`/routines/${routine.id}`, { state: { edit: true } })}
                />
            </CardActions>
        </Card>
    ));
}
