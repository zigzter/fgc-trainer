import { Alert, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { confirmSignUp } from "aws-amplify/auth";
import Form from "../components/Form";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

interface FormData {
    code: string;
}

export default function VerifyEmail() {
    const { register, handleSubmit } = useForm<FormData>({ defaultValues: { code: "" } });
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState("");
    const [params] = useSearchParams();

    const onSubmit = async (data: FormData) => {
        const username = params.get("username");
        if (!username) {
            setError("Username is required");
            return;
        }
        setIsLoading(true);
        const confirmResult = await confirmSignUp({
            username,
            confirmationCode: data.code,
        });
        setIsLoading(false);
        setIsComplete(confirmResult.isSignUpComplete);
    };

    return (
        <>
            <p>Enter the verification code sent to your email.</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Verification Code"
                    id="code"
                    {...register("code", { required: "Verification code is required" })}
                />
                <LoadingButton loading={isLoading} variant="contained" type="submit">
                    Verify
                </LoadingButton>
            </Form>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {isComplete && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Email is confirmed.
                </Alert>
            )}
        </>
    );
}
