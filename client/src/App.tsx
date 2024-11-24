import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SigninForm } from './components/core/auth/login/components/SigninForm';
import Page from './pages/formPage/page';
import { TemplateContainer } from './pages/templates/components/TemplateContainer';
import { Edit } from './pages/edit';
import { EditWelcomeCard } from './pages/edit/components/EditWelcomeCard';
import { AddQuestionButton } from './pages/edit/components/AddQuestionButton';
import { QuestionCard } from './pages/edit/components/QuestionCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/a" element={<TemplateContainer />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/add" element={<AddQuestionButton />} />
        <Route path="/add" element={<AddQuestionButton />} />
        <Route path="/test" element={<QuestionCard />} />

      </Routes>
    </Router>
  );
}

export default App;
