import { Paper, Tab, Tabs } from "@mui/material";
import SignIn from "../components/SignIn";
import { SyntheticEvent, useState } from "react";
import SignUp from "../components/SignUp";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Auth() {
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (_: SyntheticEvent, newVal: number) => {
        setTabValue(newVal);
    };

    return (
        <Paper sx={{ p: 4, width: 400, mx: "auto", mt: 8 }}>
            <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 2 }}>
                <Tab label="Sign In" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
            <SignIn index={0} value={tabValue} />
            <SignUp index={1} value={tabValue} />
        </Paper>
    );
}
