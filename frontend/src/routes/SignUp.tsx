import { useForm } from "react-hook-form";
import Form from "../components/Form";
import { Paper, Button, TextField, Alert } from "@mui/material";
import { AuthError, signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
    username: string;
    password: string;
    email: string;
};

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState("");

    const onSubmit = async (data: FormData) => {
        try {
            await signUp(data);
            navigate("/");
        } catch (e) {
            console.error(e);
            if (e instanceof AuthError) {
                setSignUpError(e.message);
            } else {
                setSignUpError("Something went wrong.");
            }
        }
    };

    return (
        <Paper sx={{ p: 4, width: 400 }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Username"
                    id="username"
                    {...register("username", { required: "Username is required" })}
                    helperText={errors.username?.message}
                />
                <TextField
                    label="Email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    helperText={errors.password?.message}
                />
                <Button variant="contained" type="submit">
                    Sign Up
                </Button>
            </Form>
            {signUpError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {signUpError}
                </Alert>
            )}
        </Paper>
    );
}
