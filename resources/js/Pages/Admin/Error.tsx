import ErrorPage from "@/Components/error-page";
import React from "react";

export default function Error({ message, redirect_url }: any) {
    return (
        <div>
            <ErrorPage message={message} redirect_url={redirect_url} />
        </div>
    );
}
