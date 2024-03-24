import { useForm } from "react-hook-form";
import { Alert, Button, Link, TextField } from "@mui/material";
import { AuthError, signIn } from "aws-amplify/auth";
import Form from "../components/Form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

type FormData = {
    username: string;
    password: string;
};

interface Props {
    index: number;
    value: number;
}

export default function SignIn({ index, value }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const [signInError, setSignInError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const watchFields = watch();
    const shouldDisableButton = Object.values(watchFields).some((value) => !value);

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await signIn(data);
            navigate("/");
        } catch (e) {
            setIsLoading(false);
            console.error(e);
            if (e instanceof AuthError) {
                setSignInError(e.message);
            } else {
                setSignInError("Something went wrong.");
            }
        }
    };

    return (
        <div role="tabpanel" hidden={value !== index}>
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
                <LoadingButton
                    disabled={shouldDisableButton}
                    loading={isLoading}
                    variant="contained"
                    type="submit"
                >
                    Sign In
                </LoadingButton>
            </Form>
            {signInError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {signInError}
                </Alert>
            )}
            <div style={{ marginTop: 8 }}>
                {/* sx does not want to work on the Link */}
                <Link component={RouterLink} to="#">
                    Forgot password?
                </Link>
            </div>
        </div>
    );
}
