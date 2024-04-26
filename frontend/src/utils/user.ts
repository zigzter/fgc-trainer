import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export async function getUser() {
    try {
        const { userId, username } = await getCurrentUser();
        return { userId, username };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getJWT() {
    try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        return {
            payload: accessToken?.payload,
            string: accessToken?.toString(),
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}
