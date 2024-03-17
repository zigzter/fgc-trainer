import { Stack } from "@mui/material";
import React from "react";

interface Props {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, onSubmit }: Props) {
    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={2}>{children}</Stack>
        </form>
    );
}
