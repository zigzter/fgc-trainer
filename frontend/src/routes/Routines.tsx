import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { ROUTINES_URL } from "../config";
import { Routine } from "../types/routines";
import RoutineForm from "../components/RoutineForm";
import { getJWT } from "../utils/user";

export default function Routines() {
    const [isCreating, setIsCreating] = useState(false);
    const { data, error, isFetching } = useQuery({
        queryKey: ["routines"],
        queryFn: async () => {
            const jwt = await getJWT();
            const data = await fetch(ROUTINES_URL, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${jwt?.string || ""}`,
                },
            });
            return data.json();
        },
    });

    const mutation = useMutation<Routine>({
        mutationFn: async () => {
            const jwt = await getJWT();
            const res = await fetch(ROUTINES_URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${jwt?.string || ""}`,
                },
                body: JSON.stringify({
                    routine: {
                        user_id: "65fe36ec-4e4f-4adf-8116-c437860c5176",
                        title: "nair flipkick",
                        combos: "[]",
                        game: "Smash Ultimate",
                        notes: "frig man",
                    },
                }),
            });
            return res.json();
        },
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm onCancel={() => setIsCreating(false)} onSubmit={onSubmit} />
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Routine</Button>
            )}
        </>
    );
}
