import { useEffect, useState } from "react";
import { getUser } from "../utils/user";
import { Navigate } from "react-router-dom";
import Root from "./Root";

export default function PrivateRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    useEffect(() => {
        async function checkUser() {
            const user = await getUser();
            setIsLoggedIn(!!user);
        }
        checkUser();
    }, []);
    if (isLoggedIn === undefined) {
        return null;
    }
    return isLoggedIn ? <Root /> : <Navigate to="/signin" replace />;
}
