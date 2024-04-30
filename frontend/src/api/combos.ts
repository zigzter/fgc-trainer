import { COMBOS_URL } from "../config";
import { getJWT } from "../utils/user";

export interface ComboResponse {
    id: string;
    inputs: string[];
    name: string;
    notes: string;
    routine_id: string;
    created_at: string;
    updated_at: string;
}

export const getCombos = async (id: string): Promise<ComboResponse[]> => {
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

export const upsertCombo =
    (method: "PUT" | "POST", id?: string) =>
    async (data): Promise<ComboResponse> => {
        const jwt = await getJWT();
        console.log(data);
        const res = await fetch(method === "PUT" ? `${COMBOS_URL}/${id}` : COMBOS_URL, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt?.string || ""}`,
            },
            body: JSON.stringify({
                combo: {
                    name: data.name,
                    inputs: data.inputs,
                    notes: data.notes,
                    routine_id: id,
                },
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
