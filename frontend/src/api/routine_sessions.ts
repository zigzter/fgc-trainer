import { ROUTINE_SESSIONS_URL } from "../config";
import { getJWT } from "../utils/user";
import { RoutineResponse } from "./routines";

export interface RoutineSessionResponse {
    id: string;
    routine_id: string;
    user_id: string;
    started_at: string;
    completed_at: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    routine: RoutineResponse;
}

export const getRoutineSessions = async (): Promise<RoutineSessionResponse[]> => {
    const jwt = await getJWT();
    const res = await fetch(ROUTINE_SESSIONS_URL, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};

export const getRoutineSession = async (id: string): Promise<RoutineSessionResponse> => {
    const jwt = await getJWT();
    const res = await fetch(`${ROUTINE_SESSIONS_URL}/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};

export const getActiveRoutineSession = async (): Promise<RoutineSessionResponse> => {
    const jwt = await getJWT();
    const res = await fetch(`${ROUTINE_SESSIONS_URL}/active`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};

export const createRoutineSession = async (routineId: string): Promise<RoutineSessionResponse> => {
    const jwt = await getJWT();
    const res = await fetch(ROUTINE_SESSIONS_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            routine_session: { routine_id: routineId },
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};

export const updateRoutineSession = async (session: Partial<RoutineSessionResponse>) => {
    const jwt = await getJWT();
    const res = await fetch(`${ROUTINE_SESSIONS_URL}/${session.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${jwt?.string}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            routine_session: session,
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};
