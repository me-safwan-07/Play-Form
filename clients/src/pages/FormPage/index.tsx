import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import { FormHome } from './components/FormHome';

function FormPage() {
  return (
    <div>
      <Routes>
        <Route 
          path="/forms" 
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FormHome />
            </Suspense>
          } 
        />
      </Routes>
    </div>
  )
}

export default FormPage;
