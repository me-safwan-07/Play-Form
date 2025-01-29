import Button from '@/components/ui/Button'
import { PlusIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContentWrapper } from '@/components/ui/PageContentWrapper';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormsList } from '@/components/ui/FormsList';
import useFetch from '@/hooks/useFetch';
import { getFormCount } from '@/api';
import { TemplateList } from '@/components/ui/TemplateList';
import { FORMS_PER_PAGE } from '@/lib/constants';

export const FormHome = () =>  {
  const navigate = useNavigate();

  const { environmentId } = useParams();
  if (!environmentId) {
    navigate('/auth/login');
  }
  
  const { data: formsCount } = useFetch<number>(getFormCount);

  const createFormButton = (
    <Button
      size='sm'
      onClick={() => navigate(`/environments/${environmentId}/forms/template`)}
      variant='darkCTA'
      EndIcon={PlusIcon}
    >
      New Form
    </Button>
  );

  return (
    <PageContentWrapper>
      {formsCount && formsCount > 0 ? (
        <>
          <PageHeader pageTitle='Match Forms' cta={createFormButton}/>
          <FormsList
              // environment={environmentId || ''}
              // formsPerPage={FORMS_PER_PAGE}
          />
        </>
      ) : (
        <>
            <h1 className="px-6 text-3xl font-extrabold text-slate-700">
                You&apos;re all set! Time to create your first survey.
            </h1>
            <TemplateList 
              environment={environmentId || ''} 
            />
        </>
      )}
    </PageContentWrapper>
  )
};