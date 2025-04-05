import { SignupOptions } from '@/pages/AuthPage/signup/components/SignupOptions';
import { XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


interface SignupFormProps {
  // webAppUrl: string;
  privacyUrl: string | undefined;
  termsUrl: string | undefined;
}

export const SignupForm = ({
  privacyUrl,
  termsUrl,
}: SignupFormProps) => {
  const [error, setError] = useState<string>("");
  return (
    <>
    {error && (
      <div className="absolute top-10 rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-700">An error occurred when signing you up</h3>
            <div className="mt-2 text-sm text-red-700">
              <p className="space-y-1 whitespace-pre-wrap">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className='text-center'>
        <h1 className='mb-4 text-slate-700'>Create your PlayForm account</h1>
        <SignupOptions
          setError={setError}
        />
        {(termsUrl || privacyUrl) && (
          <div className="mt-3 text-center text-xs text-slate-500">
            By signing up, you agree to our
            <br />
            {termsUrl && (
              <Link to={termsUrl} target='_blank' rel='noreferrer' className='font-semibold'>
                Terms of Service
              </Link>
            )}
            {termsUrl && privacyUrl && <span> and </span>}
            {privacyUrl && (
              <Link to={privacyUrl} target='_blank' rel='noreferrer' className='font-semibold'>
                Privacy Policy
              </Link>
            )}
            <hr className='mx-6 mt-3'></hr>
          </div>
        )}

        <div className="mt-4 text-center text-xs">
            <span className="leading-5 text-slate-500">Have an account?</span>
            <br />
            <Link 
              to="/auth/login" 
              className='font-semibold text-slate-600 underline hover:text-slate-700'>
                  Login
            </Link>
        </div>
    </div>
    </>
  )
};