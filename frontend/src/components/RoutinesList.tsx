import { useState } from "react";
import { MoreHoriz } from "@mui/icons-material";
import {
    Card,
    CardActionArea,
    CardActions,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoutine, getRoutines } from "../api/routines";

export default function RoutinesList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
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
        <Card key={routine.id} variant="outlined" sx={{ display: "flex", my: 2 }}>
            <CardActionArea onClick={() => navigate(`/routines/${routine.id}`)} sx={{ p: 2 }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {routine.game}
                </Typography>
                <Typography variant="h5">{routine.title}</Typography>
            </CardActionArea>
            <CardActions>
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
            </CardActions>
        </Card>
    ));
}
