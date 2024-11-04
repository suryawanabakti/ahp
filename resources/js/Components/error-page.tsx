import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

import { AlertCircle } from "lucide-react";

const ErrorPage = ({
    message,
    redirect_url,
}: {
    message: string;
    redirect_url: string;
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <div className="text-red-600 mb-4">
                <AlertCircle className="h-16 w-16" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                Oops! Something went wrong.
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button
                onClick={() => router.get(redirect_url)}
                variant="default"
                className="bg-red-500 hover:bg-red-600 text-white"
            >
                Back to Home
            </Button>
        </div>
    );
};

export default ErrorPage;
