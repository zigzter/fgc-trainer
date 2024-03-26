import { getCurrentUser } from "aws-amplify/auth";

export async function getUser() {
    try {
        const { userId, username } = await getCurrentUser();
        return { userId, username };
    } catch (e) {
        console.error(e);
        return null;
    }
}
