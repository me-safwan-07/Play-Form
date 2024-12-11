import { SigninForm } from "@/pages/auth/login/components/SigninForm";
import { FormWrapper } from "../components/FormWrapper";
import Testimonial from "../components/Testimonial";

const Login = () => {
    return (
        <div className="grid min-h-screen w-full bg-gradient-to-tr from-slate-100 to-slate-50 lg:grid-cols-5">
            <div className="col-span-2 hidden lg:flex">
                <Testimonial />
            </div>
            <div className="col-span-3 flex flex-col items-center justify-center">
                <FormWrapper>
                    <SigninForm
                        emailAuthEnabled={true}
                        passwordResetEnabled={false}
                        googleOAuthEnabled={true}
                        publicSignUpEnabled={true}
                        isMultiOrgEnabled={true}
                    />
                </FormWrapper>
            </div>
        </div>
    )
}

export default Login;