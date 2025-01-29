import { Route, Routes } from 'react-router-dom'
import Login from './login'
import { Toaster } from "react-hot-toast";
import Signup from './signup';

function AuthPage() {
  return (
    <>
        <Toaster />
        <div className="min-h-screen bg-slate-50">
            <div className="isolate bg-white">
                <div className="bg-gradient-radial min-h-screen from-slate-200 to-slate-50">
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </Routes>
                </div>
            </div>
        </div>
    </>
  )
}

export default AuthPage


// pending auth tasks

// forgot password
// terms of service
// privacy policy
// email verification
// password reset
// google oauth
// apple oauth
// microsoft oauth
// github oauth
// linkedin oauth
// twitter oauth
// facebook oauth

