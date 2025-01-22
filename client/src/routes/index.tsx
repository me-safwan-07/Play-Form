import NotFound from '@/components/ui/NotFound';
import Analysis from '@/pages/analysis';
import UserTable from '@/pages/apitest/GetUserById';
import Auth from '@/pages/auth';
import { AddQuestionButton } from '@/pages/edit/components/AddQuestionButton';
import Form from '@/pages/formPage/page';
import { TemplateContainer } from '@/pages/templates/components/TemplateContainer';
import { TEnvironment } from '@/types/environment';
import { Edit } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';

interface AppRouterProps {
    environment: TEnvironment | null;
}

const AppRouter = () => {
    return (
    
            <Routes>
            <Route path="/forms/" element={<Form />} />
            <Route path="/forms/templates" element={<TemplateContainer/>} />
            <Route path="/forms/:id/edit" element={<Edit />} />
            <Route path="forms/:id/analysis/*" element={<Analysis />} />
            <Route path="/add" element={<AddQuestionButton />} />
            <Route path="/add" element={<AddQuestionButton />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/getuser" element={<UserTable />} />
            <Route path="*" element={<NotFound />} />
            </Routes>

    );
}

export default AppRouter;
