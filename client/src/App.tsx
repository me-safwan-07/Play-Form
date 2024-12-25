import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from './pages/formPage/page';
import { TemplateContainer } from './pages/templates/components/TemplateContainer';
import { Edit } from './pages/edit';
import { AddQuestionButton } from './pages/edit/components/AddQuestionButton';
import { QuestionCard } from './pages/edit/components/QuestionCard';
import { SelectQuestionChoice } from './pages/edit/components/SelectQuestionChoice';
import Auth from './pages/auth';
import NotFound from './components/ui/NotFound';
import UserTable from './pages/apitest/GetUserById';
import Analysis from './pages/analysis';
// import { FormFilters } from './components/core/FormsList/components/FormFilters';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/forms/" element={<Page />} />
          <Route path="/forms/templates" element={<TemplateContainer />} />
          <Route path="/forms/:id/edit" element={<Edit />} />
          <Route path="forms/:id/analysis/*" element={<Analysis />} />
          <Route path="/add" element={<AddQuestionButton />} />
          <Route path="/add" element={<AddQuestionButton />} />
          <Route path="/test" element={<QuestionCard />} />
          <Route path="/test1" element={<SelectQuestionChoice />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/getuser" element={<UserTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
