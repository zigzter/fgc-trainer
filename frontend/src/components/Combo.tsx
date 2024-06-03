import {
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { DragHandle } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import PopupMenu from "./PopupMenu";
import { ComboResponse, deleteCombo } from "../api/combos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    combo: ComboResponse;
    onEdit: () => void;
    isDragged: boolean;
}

export default function Combo({ combo, onEdit, isDragged }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: combo.id,
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => deleteCombo(combo.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["combos"] });
        },
    });

    return (
        <Card
            key={combo.id}
            sx={{ display: "flex", my: 2 }}
            ref={setNodeRef}
            style={{ transition, transform: CSS.Transform.toString(transform) }}
            {...attributes}
            {...listeners}
        >
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
            <CardActions sx={{ flexDirection: "column", justifyContent: "center" }}>
                {isDragged ? (
                    <CircularProgress size={20} />
                ) : (
                    <IconButton sx={{ cursor: "grab" }}>
                        <DragHandle />
                    </IconButton>
                )}
                <PopupMenu onDelete={mutation.mutate} onEdit={onEdit} />
            </CardActions>
        </Card>
    );
}
