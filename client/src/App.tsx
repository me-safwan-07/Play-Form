import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SigninForm } from './components/core/auth/login/components/SigninForm';
import Page from './pages/formPage/page';
import { TemplateContainer } from './pages/templates/components/TemplateContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/a" element={<TemplateContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
