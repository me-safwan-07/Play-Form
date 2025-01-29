import React, { Suspense } from 'react'
import { Routes, Route, Form } from 'react-router-dom';
import { FormHome } from './components/FormHome';

function FormPage() {
  return (
    <div>
      <Routes>
        <Route path="/forms" element={<FormHome />} />
      </Routes>
    </div>
  )
}

export default FormPage;
