import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { Toaster } from "react-hot-toast";
import {FormEditorPage} from './pages/FormEditorPage';
import { FormHome } from './pages/FormPage';
import Analysis from './pages/analysis';
import Templates from './pages/templates';
// import "./App.css";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/auth/*' element={<AuthPage />} />
        <Route path='/environments/:environmentId/forms' element={<FormHome />} />
        <Route path='/environments/:environmentId/forms/:formId/edit' element={<FormEditorPage />} />
        <Route path='/environments/:environmentId/forms/:formId/*' element={<Analysis />} />
        <Route path='/environments/:environmentId/forms/templates' element={<Templates />} />
        
      </Routes>
    </>
  );
};

export default App;
