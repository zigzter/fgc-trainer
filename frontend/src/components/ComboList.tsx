import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ComboResponse, getCombos, updateCombo } from "../api/combos";
import ComboForm from "./ComboForm";
import { GameName } from "../types/content";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Combo from "./Combo";

interface Props {
    routineId: string;
    game: GameName;
}

export default function ComboList({ routineId, game }: Props) {
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
                        <Combo combo={combo} onEdit={() => setEditingCombo(combo)} />
                    ),
                )}
            </SortableContext>
        </DndContext>
    );
}
