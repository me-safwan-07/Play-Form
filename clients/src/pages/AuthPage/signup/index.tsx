import React from 'react'
import { SignupForm } from './components/SignupForm'
import { FormWrapper } from '../components/FormWrapper'

function Signup() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <FormWrapper>
            <SignupForm />
        </FormWrapper>
    </div>
  )
}

export default Signup
