import React, { useEffect, useState } from 'react'
import { FormWrapper } from '../components/FormWrapper'
import { SigninForm } from './components/SigninForm'

function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <FormWrapper>
        <SigninForm 
            // emailAuthEnabled={true}
            // passwordResetEnabled={false}
            // googleOAuthEnabled={true}
            // publicSignUpEnabled={true}
            // isMultiOrgEnabled={true}
        />
      </FormWrapper>
    </div>
  )
}

export default Login
