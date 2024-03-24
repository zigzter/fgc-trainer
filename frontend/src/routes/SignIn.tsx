import { useForm } from "react-hook-form";
import { Alert, Paper, Button, TextField } from "@mui/material";
import { AuthError, signIn } from "aws-amplify/auth";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
    username: string;
    password: string;
};

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();
    const [signInError, setSignInError] = useState("");

    const onSubmit = async (data: FormData) => {
        try {
            await signIn(data);
            navigate("/");
        } catch (e) {
            console.error(e);
            if (e instanceof AuthError) {
                setSignInError(e.message);
            } else {
                setSignInError("Something went wrong.");
            }
        }
    };

    return (
        <Paper sx={{ width: 400, p: 4 }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Username"
                    id="username"
                    {...register("username", { required: "Username is required" })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button variant="contained" type="submit">
                    Sign In
                </Button>
            </Form>
            {signInError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {signInError}
                </Alert>
            )}
        </Paper>
    );
}
