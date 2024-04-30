import { useRouteError } from "react-router-dom";
import parseError from "../utils/parseError";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    const errorMessage = parseError(error);
    return (
        <div id="error-page">
            <h1>Whoops</h1>
            <p>An unexpected error has occurred.</p>
            <p>{errorMessage}</p>
        </div>
    );
}
