import { createUser } from "@/lib/user";
import { useRef, useState } from "react";
import { PasswordInput } from "../PasswordInput";
import { Link, useNavigate } from "react-router-dom";
// import { IsPasswordValid } from "./components/IsPasswordValid";
import Button from "../Button/index";
import { GoogleButton } from "./components/GoogleButton";
import toast from "react-hot-toast";
import { TUserCreateInput } from "@/types/user";

interface SignupOptionsProps {
  emailAuthEnabled: boolean;
  // emailFromSearchParams: string;
  // setError?: (error: string) => void;
  // emailVerificationDisabled: boolean;
  passwordResetEnabled: boolean;
  googleOAuthEnabled: boolean;
  // githubOAuthEnabled: boolean;
  // azureOAuthEnabled: boolean;
  // oidcOAuthEnabled: boolean;
  // inviteToken: string | null;
  // callbackUrl: string;
  // oidcDisplayName?: string;
}
export const SignupOptions = ({
  emailAuthEnabled,
  passwordResetEnabled,
  googleOAuthEnabled
}: SignupOptionsProps) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const checkFormValidity = () => {
    // If all fields are filled, enable the button
    if (formRef.current) {
      setButtonEnabled(formRef.current.checkValidity());
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
        toast.error("Please ensure your password meets all requirements.");
        return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data: TUserCreateInput = {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        // password: formData.get("password")?.toString() || "",
        identityProvider: "email",
    };

    setSigningUp(true);

    try {
        const response = await createUser(data);
        if (response) {
            toast.success("Account created successfully!");
            navigate('/')
        }
    } catch (e: any) {
        toast.error("An error occurred during sign-up. Please try again.");
        console.error(e.message);
    } finally {
        setSigningUp(false);
    }

    
};


  return (
    <div className="space-y-2">
      {emailAuthEnabled && (
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-2" onChange={checkFormValidity}>
          {showLogin && (
            <div>
              <div className="mb-2 transition-all duration-500 ease-in-out">
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    ref={nameRef}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Full Name"
                    aria-placeholder="Full Name"
                    required
                    className="focus:border-brand focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
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
                  // defaultValue={emailFromSearchParams}
                  className="focus:border-brand focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                />
              </div>
              <div className="transition-all duration-500 ease-in-out">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <PasswordInput
                  id="password"
                  name="password"
                  value={password ? password : ""}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="*******"
                  aria-placeholder="password"
                  onFocus={() => setIsPasswordFocused(true)}
                  required
                  className="focus:border-brand focus:ring-brand block w-full rounded-md shadow-sm sm:text-sm"
                />
              </div>
              {passwordResetEnabled && isPasswordFocused && (
                <div className="ml-1 text-right transition-all duration-500 ease-in-out">
                  <Link to="/auth/forgot-password" className="hover:text-brand-dark text-xs text-slate-500">
                    Forgot your password?
                  </Link>
                </div>
              )}
              {/* <IsPasswordValid password={password} setIsValid={setIsValid} /> */}
            </div>
          )}
          {showLogin && (
            <Button
              type="submit"
              variant="darkCTA"
              className="w-full justify-center"
              loading={signingUp}
              disabled={formRef.current ? !isButtonEnabled || !isValid : !isButtonEnabled}>
              Continue with Email
            </Button>
          )}

          {!showLogin && (
            <Button
              type="button"
              onClick={() => {
                setShowLogin(true);
                setButtonEnabled(false);
                // Add a slight delay before focusing the input field to ensure it's visible
                setTimeout(() => nameRef.current?.focus(), 100);
              }}
              variant="darkCTA"
              className="w-full justify-center">
              Continue with Email
            </Button>
          )}
        </form>
      )}
      {googleOAuthEnabled && (
        <>
          <GoogleButton inviteUrl={""} />
        </>
      )}
      {/* {githubOAuthEnabled && (
        <>
          <GithubButton inviteUrl={callbackUrl} />
        </>
      )}
      {azureOAuthEnabled && (
        <>
          <AzureButton inviteUrl={callbackUrl} />
        </>
      )}
      {oidcOAuthEnabled && (
        <>
          <OpenIdButton inviteUrl={callbackUrl} text={`Continue with ${oidcDisplayName}`} />
        </>
      )} */}
    </div>
  )
}