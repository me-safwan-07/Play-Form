import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SigninForm } from './components/core/auth/login/components/SigninForm';
import Page from './pages/formPage/page';
import { TemplateContainer } from './pages/templates/components/TemplateContainer';
import { Edit } from './pages/edit';
import { EditWelcomeCard } from './pages/edit/components/EditWelcomeCard';
import { AddQuestionButton } from './pages/edit/components/AddQuestionButton';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/a" element={<TemplateContainer />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/add" element={<AddQuestionButton />} />
      </Routes>
    </Router>
  );
}

export default App;
