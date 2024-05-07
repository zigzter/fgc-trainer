import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

interface Props {
    onClose: () => void;
    text: string;
    type?: "success" | "info" | "warning" | "error";
}

export default function Notification({ onClose, text, type }: Props) {
    // TODO: set this up
    const [open, setOpen] = useState(false);

    return (
        <Snackbar open={open} onClose={onClose}>
            <Alert severity={type}>{text}</Alert>
        </Snackbar>
    );
}
