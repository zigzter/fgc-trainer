import { ROUTINES_URL } from "../config";
import { GameName } from "../types/content";
import { getJWT } from "../utils/user";
import { ExistingCombo } from "./combos";

export const routineKeys = {
    all: ["routines"] as const,
    details: (id: string) => [...routineKeys.all, id] as const,
};

export interface RoutineResponse {
    id: string;
    user_id: string;
    game: GameName;
    title: string;
    notes: string;
    combos: ExistingCombo[];
    created_at: string;
    updated_at: string;
}

export class RoutineError extends Error {
    statusCode: number;
    constructor({ message, statusCode }: { message: string; statusCode: number }) {
        super(message);
        this.statusCode = statusCode;
    }
}

export interface RoutineFormData {
    game: string;
    title: string;
    notes: string;
}

export const getRoutines = async (): Promise<RoutineResponse[]> => {
    const jwt = await getJWT();
    const res = await fetch(ROUTINES_URL, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });
    if (!res.ok) {
        throw new RoutineError({
            message: res.statusText,
            statusCode: res.status,
        });
    }
    return res.json();
};

export const upsertRoutine =
    (method: "PUT" | "POST", id?: string) =>
    async (data: RoutineFormData): Promise<RoutineResponse> => {
        const jwt = await getJWT();
        // NOTE: Might be better to break this function out into two separate methods
        const res = await fetch(method === "PUT" ? `${ROUTINES_URL}/${id}` : ROUTINES_URL, {
            method: method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt?.string || ""}`,
            },
            body: JSON.stringify({
                routine: {
                    title: data.title,
                    game: data.game,
                    notes: data.notes,
                },
            }),
        });
        if (!res.ok) {
            throw new RoutineError({
                message: res.statusText,
                statusCode: res.status,
            });
        }
        return res.json();
    };

export const getRoutine = async (id: string): Promise<RoutineResponse> => {
    const jwt = await getJWT();
    const res = await fetch(`${ROUTINES_URL}/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });
    if (!res.ok) {
        throw new RoutineError({
            message: res.statusText,
            statusCode: res.status,
        });
    }
    return res.json();
};

export const deleteRoutine = async (id: string): Promise<void> => {
    const jwt = await getJWT();
    const res = await fetch(`${ROUTINES_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });
    if (!res.ok) {
        throw new RoutineError({
            message: res.statusText,
            statusCode: res.status,
        });
    }
};
