import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCombo, getCombos } from "../api/combos";
import {
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useState } from "react";

interface Props {
    routineId: string;
}

export default function ComboList({ routineId }: Props) {
    const queryClient = useQueryClient();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [targetComboId, setTargetComboId] = useState<string | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setTargetComboId(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setTargetComboId(null);
    };

    const {
        data: combos,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["combos"],
        queryFn: () => getCombos(routineId),
    });

    const mutation = useMutation({
        mutationFn: (id: string) => deleteCombo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["combos"] });
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
    console.log(combos);

    return combos.map((combo) => (
        <Card key={combo.id} sx={{ display: "flex", my: 2 }}>
            <CardContent>
                <Typography>{combo.name}</Typography>
                <Typography>{combo.notes}</Typography>
                {combo.inputs.map((input, i) => (
                    <Chip key={`${input}-${i}`} label={input} />
                ))}
            </CardContent>
            <CardActions>
                <IconButton onClick={(e) => handleClick(e, combo.id)}>
                    <MoreHoriz />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={() => null} disabled={mutation.isPending}>
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            mutation.mutate(targetComboId!);
                            handleClose();
                        }}
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
