import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ROUTINES_URL } from "../config";
import RoutineForm from "../components/RoutineForm";
import { getJWT } from "../utils/user";
import { RoutineResponse } from "../api/routines";

export default function Routines() {
    const [isCreating, setIsCreating] = useState(false);
    const { data, error, isFetching } = useQuery<any, Error, RoutineResponse[]>({
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

    return (
        <>
            <h1>Routines</h1>
            {isCreating ? (
                <RoutineForm onCancel={() => setIsCreating(false)} method="POST" />
            ) : (
                <Button onClick={() => setIsCreating(true)}>New Routine</Button>
            )}
            {data &&
                data.map((routine) => (
                    <div>
                        <Link to={`/routines/${routine.id}`}>{routine.title}</Link>
                    </div>
                ))}
        </>
    );
}
