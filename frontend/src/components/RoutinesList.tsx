import { useState } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoutine, getRoutines } from "../api/routines";

export default function RoutinesList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const queryClient = useQueryClient();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        <div key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.title}</Link>
            <IconButton onClick={handleClick}>
                <MoreHoriz />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => null} disabled={mutation.isPending}>
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => mutation.mutate(routine.id)}
                    color="error"
                    disabled={mutation.isPending}
                >
                    Delete
                </MenuItem>
            </Menu>
        </div>
    ));
}
