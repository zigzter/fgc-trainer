import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { ROUTINES_URL } from "../config";
import RoutineForm from "../components/RoutineForm";
import { getJWT } from "../utils/user";
import { RoutineResponse, deleteRoutine } from "../api/routines";
import { MoreHoriz } from "@mui/icons-material";

export default function Routines() {
    const [isCreating, setIsCreating] = useState(false);
    const queryClient = useQueryClient();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { data, error, isFetching } = useQuery<any, Error, RoutineResponse[]>({
        queryKey: ["routines"],
        queryFn: async () => {
            const jwt = await getJWT();
            const data = await fetch(ROUTINES_URL, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${jwt?.string || ""}`,
                },
            });
            return data.json();
        },
    });

    const { isPending, mutate } = useMutation({
        mutationFn: (id: string) => deleteRoutine(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["routines"] });
        },
    });

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm onCancel={() => setIsCreating(false)} method="POST" />
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Routine</Button>
            )}
            {data &&
                data.map((routine) => (
                    <div key={routine.id}>
                        <Link to={`/routines/${routine.id}`}>{routine.title}</Link>
                        <IconButton onClick={handleClick}>
                            <MoreHoriz />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => null} disabled={isPending}>
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => mutate(routine.id)}
                                color="error"
                                disabled={isPending}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                    </div>
                ))}
        </>
    );
}
