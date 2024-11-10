import { COMBO_ATTEMPTS_URL } from "../config";
import { getJWT } from "../utils/user";
import { ExistingCombo } from "./combos";

interface Args {
    id: string;
    reps_done: string;
    reps_correct: string;
}

export const bulkdCreateComboAttempts = async (combos: ExistingCombo[]) => {
    const comboIDs = combos.map((combo) => combo.id);
    const jwt = await getJWT();
    const res = await fetch(COMBO_ATTEMPTS_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string}`,
        },
        body: JSON.stringify({
            combo_ids: comboIDs,
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
};

export const updateComboAttempts = async ({ id, reps_done, reps_correct }: Args) => {
    const jwt = await getJWT();
    const res = await fetch(`${COMBO_ATTEMPTS_URL}/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string}`,
        },
        body: JSON.stringify({
            combo_attempt: {
                reps_done,
                reps_correct,
            },
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
};
