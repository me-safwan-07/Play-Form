import { SignupForm } from './components/SignupForm'
import { FormWrapper } from '../components/FormWrapper'
import { PRIVARY_URL, TERMS_URL } from '@/lib/constants'

function Signup() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <FormWrapper>
            <SignupForm 
              privacyUrl={PRIVARY_URL}
              termsUrl={TERMS_URL}
            />
        </FormWrapper>
    </div>
  )
}

export default Signup
