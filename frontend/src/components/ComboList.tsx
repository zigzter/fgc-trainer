import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComboResponse, deleteCombo, getCombos } from "../api/combos";
import {
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import PopupMenu from "./PopupMenu";

interface Props {
    routineId: string;
    onEdit: (id: ComboResponse) => void;
}

export default function ComboList({ routineId, onEdit }: Props) {
    const queryClient = useQueryClient();
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

    return combos.map((combo) => (
        <Card key={combo.id} sx={{ display: "flex", my: 2 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{combo.name}</Typography>
                {combo.notes && <Typography>Notes: {combo.notes}</Typography>}
                <Stack direction="row" spacing={1}>
                    {combo.inputs.map((input, i) => (
                        <Chip key={`${input}-${i}`} label={input} color="primary" />
                    ))}
                    <Typography>x{combo.reps}</Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <PopupMenu
                    onDelete={() => mutation.mutate(combo.id)}
                    onEdit={() => onEdit(combo)}
                />
            </CardActions>
        </Card>
    ));
}
