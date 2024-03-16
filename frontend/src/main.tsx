import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import SignUp from "./features/auth/SignUp.tsx";
import SignIn from "./features/auth/SignIn.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
        },
    },
});

const router = createBrowserRouter([
    {
        index: true,
        element: <App />,
    },
    {
        path: "signup",
        element: <SignUp />,
    },
    {
        path: "signin",
        element: <SignIn />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
);
