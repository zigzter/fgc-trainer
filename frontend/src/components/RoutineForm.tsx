import { Autocomplete, Button, TextField } from "@mui/material";
import Form from "./Form";
import { LoadingButton } from "@mui/lab";
import games from "../data/games";

interface Props {
    onCancel: () => void;
    onSubmit: () => void;
}

export default function RoutineForm({ onCancel, onSubmit }: Props) {
    return (
        <Form onSubmit={onSubmit}>
            <Autocomplete
                options={games}
                renderInput={(params) => <TextField {...params} label="Game" />}
            />
            <TextField label="Title" />
            <TextField label="Notes" />
            <Button variant="outlined" onClick={onCancel}>
                Cancel
            </Button>
            <LoadingButton variant="contained" type="submit">
                Create
            </LoadingButton>
        </Form>
    );
}
