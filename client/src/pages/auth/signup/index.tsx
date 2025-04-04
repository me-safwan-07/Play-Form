import { EMAIL_AUTH_ENABLED, GOOGLE_OAUTH_ENABLED, PASSWORD_RESET_DISABLED } from "@/lib/constants";
import { FormWrapper } from "../components/FormWrapper";
import Testimonial from "../components/Testimonial";
import { SignupForm } from "./components/SignupForm";

// interface TSigninFormState {
//   email: string;
//   password: string;
// }

export const Signin = () => {
    return (
        <div className="grid min-h-screen w-full bg-gradient-to-tr from-slate-100 to-slate-50 lg:grid-cols-5">
            <div className="col-span-2 hidden lg:flex">
                <Testimonial />
            </div>
            <div className="col-span-3 flex flex-col items-center justify-center">
                <FormWrapper>
                    <SignupForm />
                </FormWrapper>
            </div>
        </div>
    )
}