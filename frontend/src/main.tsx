import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Index from "./routes/index.tsx";
import Routines from "./routes/Routines.tsx";
import History from "./routes/History.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Amplify } from "aws-amplify";
import Auth from "./routes/Auth.tsx";

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
        errorElement: <ErrorPage />,
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
