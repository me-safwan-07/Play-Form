import Button from '@/components/ui/Button'
import { useNavigate, useParams } from 'react-router-dom';
import { PageContentWrapper } from '@/components/ui/PageContentWrapper';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormsList } from '@/components/ui/FormsList';
import { TemplateList } from '@/components/ui/TemplateList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserIcon, UserRound } from 'lucide-react';


const data = [
  {
    "id": "67947babb74c7e2853961d67",
    "createdAt": "2025-01-25T05:50:35.608Z",
    "updatedAt": "2025-01-25T05:50:35.608Z",
    "name": "Customer Feedback Form",
    "status": "draft",
    "welcomeCard": {
        "enabled": true,
        "title": "Welcome to our survey",
        "description": "We value your feedback"
    },
    "questions": [
        {
            "id": "q1",
            "type": "text",
            "title": "What's your name?",
            "required": true
        },
        {
            "id": "q2",
            "type": "rating",
            "title": "How would you rate our service?",
            "scale": 5,
            "required": true
        }
    ],
    "thankYouCard": {
        "enabled": true,
        "title": "Thank you!",
        "description": "We appreciate your feedback"
    },
    "delay": 0,
    "displayPercentage": 100,
    "verifyEmail": null,
    "redirectUrl": "https://example.com/thank-you",
    "styling": null,
    "resultShareKey": null,
    "responses": [],
    "displays": []
  }
];

const profileImage = 'https://avatars.githubusercontent.com/u/167682973?v=4'

export function FormHome() {
  const navigate = useNavigate();
  const { environmentId } = useParams();
  
  if (!environmentId) {
    navigate('/auth/login');
    return null; // Add return to prevent rendering with no environmentId
  }

  const createFormButton = (
    <div className="flex items-center">
      <Avatar
        onClick={() => navigate(`/environments/${environmentId}/profile`)}
        className='cursor-pointer'
      >
        <AvatarImage src={profileImage} alt="Profile" />
        <AvatarFallback>
          <span className='text-xl'>MS</span>
        </AvatarFallback>
      </Avatar>
    </div>
  );

  return (
    <PageContentWrapper>
      {/* {data?.forms && data?.forms.length > 0 ? ( */}
      {data && data?.length > 0 ? (
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
}