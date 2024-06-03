import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ComboResponse, getCombos, updateCombo } from "../api/combos";
import ComboForm from "./ComboForm";
import { GameName } from "../types/content";
import Combo from "./Combo";

interface Props {
    routineId: string;
    game: GameName;
}

export default function ComboList({ routineId, game }: Props) {
    const queryClient = useQueryClient();
    const [editingCombo, setEditingCombo] = useState<ComboResponse | null>(null);
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
        mutationFn: updateCombo,
        onMutate: (dragged) => {
            queryClient.invalidateQueries({ queryKey: ["combos"] });
            const previousCombos = queryClient.getQueryData<ComboResponse[]>(["combos"]);

            if (previousCombos) {
                const draggedIndex = previousCombos.findIndex((combo) => combo.id === dragged.id);
                const beforeIndex = dragged.before?.id
                    ? previousCombos.findIndex((combo) => combo.id === dragged.before?.id)
                    : previousCombos.length;
                const newOrder = [...previousCombos];
                const [draggedCombo] = newOrder.splice(draggedIndex, 1);
                newOrder.splice(beforeIndex, 0, draggedCombo);
                queryClient.setQueryData(["combos"], newOrder);
            }
            return previousCombos;
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(["combos", routineId], context);
        },
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ["combos"] });
        },
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id && combos) {
            const currCombo = combos.find((combo) => combo.id === active.id);
            const beforeCombo = combos.find((combo) => combo.id === over.id);
            if (currCombo) {
                mutation.mutate({ ...currCombo, before: beforeCombo });
            }
        }
    };

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

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={combos} strategy={verticalListSortingStrategy}>
                {combos.map((combo) =>
                    editingCombo?.id === combo.id ? (
                        <ComboForm
                            key={combo.id}
                            onCancel={() => setEditingCombo(null)}
                            onSuccess={() => setEditingCombo(null)}
                            game={game}
                            routineId={routineId}
                            method="PUT"
                            initialData={editingCombo}
                        />
                    ) : (
                        <Combo
                            isDragged={mutation.isPending && mutation.variables?.id === combo.id}
                            combo={combo}
                            onEdit={() => setEditingCombo(combo)}
                        />
                    ),
                )}
            </SortableContext>
        </DndContext>
    );
}
