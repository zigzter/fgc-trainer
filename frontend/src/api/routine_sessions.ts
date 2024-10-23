import { ROUTINE_SESSIONS_URL } from "../config";
import { getJWT } from "../utils/user";

export interface RoutineSessionResponse {
    id: string;
    routine_id: string;
    user_id: string;
    started_at: Date;
    completed_at: Date;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
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
