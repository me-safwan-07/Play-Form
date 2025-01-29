import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getFirstEnvironmentByUserId } from './hooks/environmentHooks';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/auth/*' element={<AuthPage />} />
    </Routes>
  );
};

export default App;
