import { getCurrentUser } from "aws-amplify/auth";

export default function Index() {
    getCurrentUser().then((data) => {
        console.log(data);
    });
    return <h1>fgc-trainer</h1>;
}
