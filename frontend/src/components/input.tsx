import { TextField } from "@mui/material";
import React from "react";
import { Message } from "react-hook-form";

interface Props {
    label: string;
    type?: string;
    id: string;
    error?: Message;
}

const Input = React.forwardRef(({ label, type, error, ...rest }: Props, ref) => {
    return (
        <TextField
            label={label}
            type={type}
            error={!!error}
            helperText={error}
            inputRef={ref}
            {...rest}
        />
    );
});

Input.displayName = "Input";

export default Input;
