import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ComboResponse, getCombos } from "../api/combos";
import ComboForm from "./ComboForm";
import { GameName } from "../types/content";
import { DndContext } from "@dnd-kit/core";
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
        <DndContext>
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
