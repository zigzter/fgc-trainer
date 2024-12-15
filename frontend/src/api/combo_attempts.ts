import { COMBO_ATTEMPTS_URL } from "../config";
import { getJWT } from "../utils/user";

interface Args {
    id: string;
    reps_done: number;
    reps_correct: number;
}

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
