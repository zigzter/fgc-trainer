import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Amplify } from "aws-amplify";
import Root from "./routes/Root.tsx";
import RootError from "./errors/RootError.tsx";
import Index from "./routes/index.tsx";
import Auth from "./routes/Auth.tsx";
import { rootLoader, routineLoader } from "./utils/loaders.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import VerifyEmail from "./routes/VerifyEmail.tsx";
import PrivateRoutes from "./routes/PrivateRoutes.tsx";
import Routine from "./routes/Routine.tsx";
import Routines from "./routes/Routines.tsx";
import RoutineError from "./errors/RoutineError.tsx";
import History from "./routes/History.tsx";
import RoutineSession from "./routes/RoutineSession.tsx";

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
        element: <PrivateRoutes />,
        errorElement: <RootError />,
        loader: rootLoader,
        children: [
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
                path: "session",
                element: <RoutineSession />,
            },
            {
                path: "history",
                element: <History />,
            },
        ],
    },
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
                path: "verify",
                element: <VerifyEmail />,
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
