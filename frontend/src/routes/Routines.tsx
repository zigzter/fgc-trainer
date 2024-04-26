import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { ROUTINES_URL } from "../config";
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

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm onCancel={() => setIsCreating(false)} method="POST" />
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Routine</Button>
            )}
        </>
    );
}
