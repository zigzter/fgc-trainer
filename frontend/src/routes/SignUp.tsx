import { useForm } from "react-hook-form";
import Form from "../components/Form";
import { Paper, Button, TextField } from "@mui/material";
import { signUp } from "aws-amplify/auth";

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

    const onSubmit = (data: FormData) => {
        signUp(data).then((output) => {
            console.log(output);
        });
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
                <Button type="submit">Sign Up</Button>
            </Form>
        </Paper>
    );
}
