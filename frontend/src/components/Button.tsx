import { Button as MUIButton } from "@mui/material";

interface Props {
    children: React.ReactNode;
    type?: "submit" | "reset" | "button";
}

export default function Button({ children, type }: Props) {
    return (
        <MUIButton variant="contained" color="primary" type={type}>
            {children}
        </MUIButton>
    );
}