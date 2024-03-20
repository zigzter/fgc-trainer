import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import { Paper } from "@mui/material";
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
                <Input
                    label="Username"
                    id="username"
                    {...register("username", { required: "Username is required" })}
                    error={errors.username?.message}
                />
                <Input
                    label="Email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    error={errors.password?.message}
                />
                <Button type="submit">Sign Up</Button>
            </Form>
        </Paper>
    );
}
