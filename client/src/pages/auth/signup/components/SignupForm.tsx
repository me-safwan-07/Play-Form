import { useState } from "react";
import { SignupOptions } from "@/components/ui/SignupOptions";
import { XCircleIcon } from "lucide-react"

export const SignupForm = () => {
    const [error, setError] = useState<string>("");
    return (
        <>
            {error && (
                <div className="absolute top-10 rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">An error occurred when signing you up</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p className="space-y-1 whitespace-pre-wrap">{error}</p>
                    </div>
                    </div>
                </div>
                </div>
            )}

            <div className="">
                <h1 className="mb-4 text-slate-700">Create your Formbricks account</h1>
                <SignupOptions />
            </div>
        </>
    )
}