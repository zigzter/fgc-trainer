import { COMBO_ATTEMPTS_URL } from "../config";
import { getJWT } from "../utils/user";

export const updateComboAttempts = async (id: string) => {
    const jwt = await getJWT();
    const res = await fetch(`${COMBO_ATTEMPTS_URL}/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${jwt?.string}`,
        },
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }
};
