import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import { useMutation } from "@tanstack/react-query";
import { SIGN_IN_URL } from "../../config";

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
            }),
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
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
    );
}
