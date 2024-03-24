import { useForm } from "react-hook-form";
import { Alert, Paper } from "@mui/material";
import { signIn } from "aws-amplify/auth";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
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

    const onSubmit = (data: FormData) => {
        signIn(data)
            .then(() => {
                navigate("/");
            })
            .catch((e) => {
                console.error(e);
                setSignInError(e.message);
            });
    };

    return (
        <Paper sx={{ width: 400, p: 4 }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Username"
                    id="username"
                    {...register("username", { required: "Username is required" })}
                    error={errors.username?.message}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    error={errors.password?.message}
                />
                <Button type="submit">Sign In</Button>
            </Form>
            {signInError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {signInError}
                </Alert>
            )}
        </Paper>
    );
}
