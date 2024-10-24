import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Alert, InputAdornment, IconButton } from "@mui/material";
import { AuthError, signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Form from "../components/Form";

type FormData = {
    username: string;
    password: string;
    email: string;
};

interface Props {
    index: number;
    value: number;
}

export default function SignUp({ index, value }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    });
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const watchFields = watch();
    const shouldDisableButton = Object.values(watchFields).some((value) => !value);

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await signUp({
                username: data.username,
                password: data.password,
                options: {
                    userAttributes: {
                        email: data.email,
                        preferred_username: data.username,
                    },
                },
            });
            navigate(`/verify?username=${data.username}`);
        } catch (e) {
            setIsLoading(false);
            console.error(e);
            if (e instanceof AuthError) {
                setSignUpError(e.message);
            } else {
                setSignUpError("Something went wrong.");
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
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    helperText={errors.password?.message}
                />
                <LoadingButton
                    disabled={shouldDisableButton}
                    loading={isLoading}
                    variant="contained"
                    type="submit"
                >
                    Sign Up
                </LoadingButton>
            </Form>
            {signUpError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {signUpError}
                </Alert>
            )}
        </div>
    );
}
