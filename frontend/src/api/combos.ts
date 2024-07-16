import { COMBOS_URL } from "../config";
import { getJWT } from "../utils/user";

// TODO: Split this into a response and existing Combo type
export interface ExistingCombo {
    id: string;
    inputs: string[];
    name: string;
    notes: string;
    position: number;
    reps: number;
    routine_id: string;
    created_at: string;
    updated_at: string;
    dropTargetId?: string;
}

export interface ComboFormData {
    name: string;
    notes: string;
    reps: number;
    inputs: string[];
    dropTargetId?: string;
}

export const getCombos = async (id: string): Promise<ExistingCombo[]> => {
    const jwt = await getJWT();
    const res = await fetch(COMBOS_URL + `?routine_id=${id}`, {
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

export const createCombo = async (
    data: ComboFormData,
    routineId: string,
): Promise<ExistingCombo> => {
    const jwt = await getJWT();
    const res = await fetch(COMBOS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
        body: JSON.stringify({
            combo: {
                ...data,
                routine_id: routineId,
            },
        }),
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};

export const updateCombo = async (
    data: { target?: string; direction: "before" | "after" } & ExistingCombo,
): Promise<ExistingCombo> => {
    const jwt = await getJWT();
    const res = await fetch(`${COMBOS_URL}/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
        body: JSON.stringify({
            combo: data,
        }),
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
};

export const deleteCombo = async (id: string): Promise<void> => {
    const jwt = await getJWT();
    const res = await fetch(`${COMBOS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${jwt?.string || ""}`,
        },
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
};
