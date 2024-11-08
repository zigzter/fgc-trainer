import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ExistingCombo, comboKeys, getCombos, updateCombo } from "../api/combos";
import ComboForm from "./ComboForm";
import { GameName } from "../types/content";
import Combo from "./Combo";

interface Props {
    routineId: string;
    game: GameName;
}

export default function ComboList({ routineId, game }: Props) {
    const queryClient = useQueryClient();
    const [editingCombo, setEditingCombo] = useState<ExistingCombo | null>(null);
    const {
        data: combos,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: comboKeys.all,
        queryFn: () => getCombos(routineId),
    });

    const mutation = useMutation({
        mutationFn: updateCombo,
        onMutate: (dragged) => {
            queryClient.cancelQueries({ queryKey: comboKeys.all });
            const previousCombos = queryClient.getQueryData<ExistingCombo[]>(comboKeys.all);

            if (previousCombos) {
                const oldIndex = previousCombos.findIndex((combo) => combo.id === dragged.id);
                const newIndex = previousCombos.findIndex((combo) => combo.id === dragged.target);
                const newOrder = arrayMove(previousCombos, oldIndex, newIndex);
                queryClient.setQueryData(comboKeys.all, newOrder);
            }
            return previousCombos;
        },
        onError: (_, __, context) => {
            queryClient.setQueryData([comboKeys.all, routineId], context);
        },
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: comboKeys.all });
        },
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id && combos) {
            const currCombo = combos.find((combo) => combo.id === active.id);
            const beforeCombo = combos.find((combo) => combo.id === over.id);
            if (currCombo) {
                let direction: "before" | "after" = "after";
                if (beforeCombo) {
                    direction = currCombo.position > beforeCombo?.position ? "before" : "after";
                }
                mutation.mutate({ ...currCombo, target: beforeCombo?.id, direction });
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
                        <Combo key={combo.id} combo={combo} onEdit={() => setEditingCombo(combo)} />
                    ),
                )}
            </SortableContext>
        </DndContext>
    );
}
