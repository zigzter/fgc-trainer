import { useRouteError } from "react-router-dom";
import parseError from "../utils/parseError";

export default function RoutineError() {
    const error = useRouteError();
    console.log(error);
    const errorMessage = parseError(error);
    return (
        <div id="error-page">
            <h1>Oh no</h1>
            <p>There was an issue accessing the routine:</p>
            <p>{errorMessage}</p>
        </div>
    );
}
