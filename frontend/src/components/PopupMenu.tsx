import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface Props {
    onDelete: () => void;
    onEdit: () => void;
}

export default function PopupMenu({ onDelete, onEdit }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreHoriz />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={onEdit} disabled={false}>
                    Edit
                </MenuItem>
                <MenuItem onClick={onDelete} color="error" disabled={false}>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}
