import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { ROUTINES_URL } from "../config";
import { Routine } from "../types/routines";
import RoutineForm from "../components/RoutineForm";

export default function Routines() {
    const [isCreating, setIsCreating] = useState(false);
    const { data, error, isFetching } = useQuery({
        queryKey: ["routines"],
        queryFn: async () => {
            const data = await fetch(ROUTINES_URL + "?user_id=123");
            return data.json();
        },
    });

    const mutation = useMutation<Routine>({
        mutationFn: async () => {
            const res = await fetch(ROUTINES_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    routine: {
                        user_id: "123",
                        title: "nair flipkick",
                        combos: [],
                        game: "Smash Ultimate",
                        notes: "frig man",
                    },
                }),
            });
            return res.json();
        },
    });

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm onCancel={() => setIsCreating(false)} onSubmit={mutation.mutate} />
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Routine</Button>
            )}
        </>
    );
}
