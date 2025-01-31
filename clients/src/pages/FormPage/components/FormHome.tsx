import Button from '@/components/ui/Button'
import { data, useNavigate, useParams } from 'react-router-dom';
import { PageContentWrapper } from '@/components/ui/PageContentWrapper';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormsList } from '@/components/ui/FormsList';
import { TemplateList } from '@/components/ui/TemplateList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserIcon, UserRound } from 'lucide-react';
// import { data } from '@/config/fakeData';
import { TForm } from '@/types/forms';
import useFetch from '@/hooks/useFetch';
import { getForms } from '@/api/formAPI';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FORMS_PER_PAGE } from '@/lib/constants';
import React from 'react';


const profileImage = 'https://avatars.githubusercontent.com/u/167682973?v=4'

export function FormHome() {
  const navigate = useNavigate();
  const { environmentId } = useParams();
  // const {data, error} = useFetch(getForms);

  // write the fetch function forms
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchForms = async () => {
      const data = await axios.get('http://localhost:3000/api/forms/count', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data);
      setCount(data.data.count);
    };
    fetchForms();
  }, []);

 console.log(count);
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
      {count && count > 0 ? (
        <>
          <PageHeader pageTitle='Match Forms' cta={createFormButton}/>
          <FormsList
              environment={environmentId}
              formsPerPage={FORMS_PER_PAGE  }
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