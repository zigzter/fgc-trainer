import { isRouteErrorResponse } from "react-router-dom";

/** Takes an error of type 'unknown' and returns the message */
export default function parseError(error: unknown) {
    let errorMessage = "Unknown error";
    if (isRouteErrorResponse(error)) {
        errorMessage = error.data;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    }
    return errorMessage;
}
