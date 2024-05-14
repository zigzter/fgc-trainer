import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Card,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import { ComboResponse, deleteCombo, getCombos } from "../api/combos";
import PopupMenu from "./PopupMenu";
import ComboForm from "./ComboForm";
import { GameName } from "../types/content";

interface Props {
    routineId: string;
    game: GameName;
}

export default function ComboList({ routineId, game }: Props) {
    const [editingCombo, setEditingCombo] = useState<ComboResponse | null>(null);
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

    return combos.map((combo) =>
        editingCombo?.id === combo.id ? (
            <ComboForm
                key={combo.id}
                onCancel={() => setEditingCombo(null)}
                game={game}
                routineId={routineId}
                method="PUT"
                initialData={editingCombo}
            />
        ) : (
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
                        onEdit={() => setEditingCombo(combo)}
                    />
                </CardActions>
            </Card>
        ),
    );
}
