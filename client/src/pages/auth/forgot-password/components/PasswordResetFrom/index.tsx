import Button from "@/components/ui/Button/index";
import { forgotPassword } from "@/lib/user";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PasswordResetFrom = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    interface FormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement;
    }

    interface PasswordResetFormElement extends HTMLFormElement {
        readonly elements: FormElements;
    }

    const handleSubmit = async (e: React.FormEvent<PasswordResetFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword(e.currentTarget.elements.email.value);
            navigate("/auth/forgot-password/email-sent");
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && (
                <div className="absolute top-10 rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">An error occurred when logging you in</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p className="space-y-1 whitespace-pre-wrap">{error}</p>
                    </div>
                    </div>
                </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-800">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:border-brand focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                    />
                </div>
                </div>

                <div>
                <Button type="submit" variant="darkCTA" className="w-full justify-center" loading={loading}>
                    Reset password
                </Button>
                <div className="mt-3 text-center">
                    <Button variant="minimal" href="/auth/login" className="w-full justify-center">
                        Back to login
                    </Button>
                </div>
                </div>
            </form>
        </>
    );
};