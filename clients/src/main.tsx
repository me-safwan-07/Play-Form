import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ResponseFilterProvider } from './context/ResponseFilterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ResponseFilterProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ResponseFilterProvider>
)
