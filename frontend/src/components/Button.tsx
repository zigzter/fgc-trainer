import { Button as MUIButton } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
    children: React.ReactNode;
    type?: "submit" | "reset" | "button";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, type, onClick, ...props }: Props) {
    return (
        <MUIButton variant="contained" color="primary" type={type} onClick={onClick} {...props}>
            {children}
        </MUIButton>
    );
}
