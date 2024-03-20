import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import { SIGN_IN_URL } from "../config";
import { Paper } from "@mui/material";

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

    const mutation = useMutation({
        mutationFn: (user: FormData) =>
            fetch(SIGN_IN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }).then((res) => res.json()),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log("Error on SignIn:", error);
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
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
        </Paper>
    );
}
