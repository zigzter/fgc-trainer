import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function Form({ children }: Props) {
    return <form>{children}</form>;
}
