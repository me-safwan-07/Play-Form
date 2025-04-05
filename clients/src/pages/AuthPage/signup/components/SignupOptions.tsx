import { createUser } from "@/api/usersAPI";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../../../components/ui/PasswordInput";
import { IsPasswordValid } from "./isPasswordValid";
import { Button } from "@/components/ui/Button";
import { GoogleButton } from "../../components/GoogleButton";

interface SignupOptionsProps {
    setError?: (error: string) => void;
}
export const SignupOptions = ({
    setError,
}: SignupOptionsProps) => {
    const [password, setPassword] = useState<string  | null>(null);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [signingUp, setSigningup] = useState(false);
    const [isButtonEnabled, setButtonEnabled] = useState(true);

    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const checkFormValidity = () => {
        // If all fields are filled, enable the button
        if (formRef.current) {
            setButtonEnabled(formRef.current.checkValidity());
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!isValid) {
            return;
        }

        setSigningup(true);

        try {
            await createUser(
                e.target.elements.name.value,
                e.target.elements.email.value,
                e.target.elements.password.value,
            );
            const url = `/auth/verification-requested?email=${encodeURIComponent(e.target.elements.email.value)}`;

            navigate(url);
        } catch (e: any) {
            if (setError) {
                setError(e.message);
            }
            setSigningup(false);
        }
    };

    return (
        <div className="space-y-2">
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-2 text-slate-800" onChange={checkFormValidity}>
                <div>
                    <div className="mb-2 transition-all duration-500 ease-in-out">
                        <label htmlFor="name" className="sr-only">
                            Full Name
                        </label>
                        <div className="mt-1">
                            <input 
                                ref={nameRef}
                                type="text" 
                                name="name" 
                                id="name"
                                autoComplete="given-name"
                                placeholder="Full Name"
                                aria-placeholder="Full Name"
                                required
                                className="block w-full rounded-md border border-slate-300 shadow-sm sm:text-sm p-2 text-black outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-2 transition-all duration-500 ease-in-out">
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="work@email.com"
                            className="block w-full rounded-md border border-slate-300 shadow-sm sm:text-sm p-2 text-black outline-none"
                        />
                    </div>
                    <div className="mb-2 transition-all duration-500 ease-in-out">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <PasswordInput 
                            id="password"
                            name="password"
                            value={password ? password : ""}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="********"
                            aria-placeholder="password"
                            onFocus={() => setIsPasswordFocused(true)}
                            required
                            className="block w-full rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    {isPasswordFocused && (
                        <div className="ml-1 text-right transition-all duration-500 ease-in-out">
                            <Link to="/auth/forgot-password" className="text-xs text-slate-500">
                                Forgot your password
                            </Link>
                        </div>
                    )}
                    <IsPasswordValid password={password} setIsValid={setIsValid}/>
                </div>

                <Button
                    type="submit"
                    variant="darkCTA"
                    className="w-full justify-center"
                    loading={signingUp}
                    disabled={formRef.current ? !isButtonEnabled || !isValid: !isButtonEnabled}
                >
                    Continue with Email
                </Button>
            </form>
            <GoogleButton />
        </div>
    )
}