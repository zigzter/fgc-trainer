import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

export async function loader({ params }) {
    console.log({ params });
    return { test: "hi" };
}

export default function Root() {
    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Outlet />
            </Container>
        </>
    );
}
