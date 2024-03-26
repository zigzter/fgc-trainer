import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { signOut } from "aws-amplify/auth";
import GamepadIcon from "@mui/icons-material/Gamepad";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/user";

const pages = ["Routines", "History"];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getUser().then((data) => {
            if (data) {
                setCurrentUser(data.username);
            } else {
                setCurrentUser("");
            }
        });
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSignOutClick = async () => {
        await signOut();
        navigate("/");
    };

    const renderAuthButtons = (currUsername: string) => {
        if (currUsername !== "") {
            return (
                <Box display="flex" alignItems="center">
                    <Typography>{currUsername}</Typography>
                    <Button
                        sx={{ my: 2, color: "white", display: "block" }}
                        onClick={handleSignOutClick}
                    >
                        Sign Out
                    </Button>
                </Box>
            );
        }
        return (
            <Button component={Link} sx={{ my: 2, color: "white", display: "block" }} to="/signin">
                Sign In
            </Button>
        );
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        FGC TRAINER
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <GamepadIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        FGC TRAINER
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box>{renderAuthButtons(currentUser)}</Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
