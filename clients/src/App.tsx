import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getFirstEnvironmentByUserId } from './hooks/environmentHooks';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import FormPage from './pages/FormPage';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/auth/*' element={<AuthPage />} />
        <Route path='/environments/:environmentId/*' element={<FormPage />} />
      </Routes>
    </>
  );
};

export default App;
