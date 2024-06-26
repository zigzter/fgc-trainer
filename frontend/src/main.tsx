import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Amplify } from "aws-amplify";
import Root from "./routes/Root.tsx";
import RootError from "./errors/RootError.tsx";
import RoutineError from "./errors/RoutineError.tsx";
import Index from "./routes/index.tsx";
import Routines from "./routes/Routines.tsx";
import History from "./routes/History.tsx";
import Auth from "./routes/Auth.tsx";
import Routine from "./routes/Routine.tsx";
import { rootLoader, routineLoader } from "./utils/loaders.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import VerifyEmail from "./routes/VerifyEmail.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
        },
    },
});

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "us-east-1_lQbpoIEmv",
            userPoolClientId: "18kvmudvk3dnl76n62hqltt7pm",
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <RootError />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "signin",
                element: <Auth />,
            },
            {
                path: "routines",
                element: <Routines />,
            },
            {
                path: "routines/:routineId",
                element: <Routine />,
                errorElement: <RoutineError />,
                loader: routineLoader(queryClient),
            },
            {
                path: "verify",
                element: <VerifyEmail />,
            },
            {
                path: "history",
                element: <History />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
);
