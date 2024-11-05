import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { XCircleIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

interface TSigninFormState {
  email: string;
  password: string;
  totpCode?: string;
  backupCode?: string;
}

export const SigninForm = () => {
  const formMethods = useForm<TSigninFormState>();
  const [searchParams] = useSearchParams();
  const [loggingIn, setLoggingIn] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [totpLogin, setTotpLogin] = useState(true);
  const [totpBackup, setTotpBackup] = useState(false);
  const [signInError, setSignInError] = useState("sfdasdfd");

  const onSubmit = formMethods.handleSubmit(async (data) => {
    try {
      setLoggingIn(true);
      // Perform login operation
      console.log("Form Data:", data);
      // Reset the form after successful submission
      formMethods.reset();
    } catch (error) {
      setSignInError("Invalid credentials, please try again.");
    } finally {
      setLoggingIn(false);
    }
  });

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <div className="text-center">
            <h1 className="mb-4 text-slate-700">Login to your account</h1>
            {showLogin && (
              <div>
                <div className="mb-2 transition-all duration-500 ease-in-out">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="work@email.com"
                    defaultValue={searchParams.get("email") || ""}
                    className="text-white focus:border-brand-dark focus:ring-brand-dark block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                    {...formMethods.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {formMethods.formState.errors.email && (
                    <span className="text-red-600">
                      {formMethods.formState.errors.email.message}
                    </span>
                  )}
                </div>
                <div className="transition-all duration-500 ease-in-out">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="*******"
                    required
                    className="text-white focus:border-brand-dark focus:ring-brand-dark block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                    {...formMethods.register("password", {
                      required: "Password is required",
                    })}
                    onFocus={() => setIsPasswordFocused(true)}
                  />
                  {formMethods.formState.errors.password && (
                    <span className="text-red-600">
                      {formMethods.formState.errors.password.message}
                    </span>
                  )}
                </div>
                <div className="ml-1 text-right transition-all duration-500 ease-in-out">
                  <Link to="#" className="hover:text-brand-dark text-xs text-slate-500">
                    Forgot your password
                  </Link>
                </div>
              </div>
            )}
          </div>

          {signInError && (
            <div className="absolute top-10 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    An error occurred when logging you in
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p className="space-y-1 whitespace-pre-wrap">{signInError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loggingIn}
            className="mt-4 w-full rounded-md bg-brand-dark py-2 px-4 text-white"
          >
            {loggingIn ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </FormProvider>
    </>
  );
};
