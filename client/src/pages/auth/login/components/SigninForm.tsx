import { useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { XCircleIcon } from "lucide-react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button/index";
import { GoogleButton } from "@/components/ui/SignupOptions/components/GoogleButton";
import { handleGoogleSignIn } from "@/lib/user";

interface TSigninFormState {
  email: string;
  password: string;
}

interface SigninFormProps {
  emailAuthEnabled: boolean;
  passwordResetEnabled: boolean;
  googleOAuthEnabled: boolean;
  publicSignUpEnabled: boolean;
  isMultiOrgEnabled: boolean;
}

export const SigninForm = ({ 
  emailAuthEnabled,
  passwordResetEnabled,
  googleOAuthEnabled,
  publicSignUpEnabled,
  isMultiOrgEnabled
}: SigninFormProps) => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailRef = useRef<HTMLInputElement>(null);
  const formMethods = useForm<TSigninFormState>();
  
  const onSubmit: SubmitHandler<TSigninFormState> = (async (data) => {
    setLoggingIn(true);

    try {
      const signInResponse = await signin
    } catch (error: any) {
      setSignInError(error.message || "Invalid credentials, please try again.");
    } finally {
      setLoggingIn(false);
    }
  });

  // const [searchParams] = useSearchParams();
  const [loggingIn, setLoggingIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [signInError, setSignInError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  // const gogleLoginIn = handleGoogleSignIn();
  return (
    <>
      <FormProvider {...formMethods}>
        <div className="text-center">
          <h1 className="mb-4 text-slate-700">Login to your account</h1>
          <div className="space-y-2">
            <form>
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
                      defaultValue={searchParams?.get("email") || ""}
                      className="focus:border-brand focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                      {...formMethods.register("email", {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Controller
                      name="password"
                      control={formMethods.control}
                      render={({ field }) => (
                        <PasswordInput 
                          id="password"
                          autoComplete="current-password"
                          placeholder="*******"
                          aria-placeholder="password"
                          onFocus={() => setIsPasswordFocused(true)}
                          required
                          className="focus:border-brand focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                          {...field}
                        />
                      )}
                      rules={{
                        required: true,
                      }}
                    />
                  </div>
                  {passwordResetEnabled && isPasswordFocused && (
                    <div className="">
                      <Link to="/auth/forget-passoword">
                        Forgot your password?
                      </Link>
                    </div>
                  )}
                </div>
              )}
              {emailAuthEnabled && (
                <Button
                  onClick={() => {
                    if (!showLogin) {
                      setShowLogin(true);
                      setTimeout(() => emailRef.current?.focus(), 100);
                    } else if (formRef.current) {
                      formRef.current.requestSubmit();
                      console.log(formRef.current)
                    }
                  }}
                  variant="darkCTA"
                  className="w-full justify-center"
                  loading={loggingIn}
                >
                  Login with Email
                </Button>
              )}
            </form>

            {googleOAuthEnabled && (
              <>
                <GoogleButton handleGoogleSignIn={handleGoogleSignIn}/>
              </>
            )}
          </div>
          
          {publicSignUpEnabled  && isMultiOrgEnabled && (
            <div className="mt-2 text-center text-xs">
              <span className="leading-5 text-slate-500">New to playform?</span>
              <br />
              <Link
                to={"/auth/signup"}
                className="font-semibold text-slate-600 underline hover:text-slate-700"
              >
                Create an account
              </Link>
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
                <h3 className="text-sm font-medium text-red-800">An error occurred when logging you in</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p className="space-y-1 whitespace-pre-wrap">{signInError}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </FormProvider>
    </>
  );
};
