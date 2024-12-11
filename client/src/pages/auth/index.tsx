import { Routes, Route } from 'react-router-dom';
import Login from './login';
import {Signin} from './signup';
import ForgotPassword from './forgot-password';
import EmailSent from './forgot-password/Email-sent';
import Testing from './testing';


const Auth = () => {
  return (
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signin/>} />
        <Route path="forgot-password" element={<ForgotPassword/>} />
        <Route path="forgot-password/email-sent" element={<EmailSent />} />
        <Route path="test" element={<Testing />} />
      </Routes>
  );
}

export default Auth;
