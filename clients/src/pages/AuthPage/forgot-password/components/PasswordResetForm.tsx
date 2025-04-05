import { Button } from "@/components/ui/Button";
import { forgotPassword } from "@/lib/user";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PasswordResetForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // await forgotPassword(e.target.elements.email.value);
            navigate("/auth/forgot-password/email-sent");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            {error && (
                <div className="absolute top-0 rounded-md bg-red-50 p-4">
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
                            type="email" 
                            name="email" 
                            id="email"
                            autoComplete="email"
                            required
                            className="focus:border-brand focus:ring-brand block  w-full rounded-md border border-slate-300 shadow-sm sm:text-sm p-2 outline-none" 
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
        </div>
    )
};