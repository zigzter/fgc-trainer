import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    let errorMessage = "Unknown error";
    if (isRouteErrorResponse(error)) {
        errorMessage = error.data;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    }
    return (
        <div id="error-page">
            <h1>Whoops</h1>
            <p>An unexpected error has occurred.</p>
            <p>{errorMessage}</p>
        </div>
    );
}
