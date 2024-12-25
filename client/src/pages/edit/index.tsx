import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormEditor } from './components/FormEditor';
import axios from 'axios';
import { ErrorComponent } from '@/components/ui/ErrorComponent';
import { TForm } from '@/types/forms';

export const Edit = () => {
  const { id } = useParams();
  const [form, setForm] = useState<TForm| null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      const res = await axios.get(`http://localhost:3000/api/forms/${id}`);
      if (res.status === 200) {
        setForm(res.data);
      } else {
        console.error('Failed to fetch form data');
      }
    };

    fetchForm();
  }, [id]);

  if (!form || form.id !== id) {
    return <ErrorComponent />;
  }

  return (
    <FormEditor 
      form={form}
      // product={product}
      // environment={environment}
      // actionClasses={actionClasses}
      // attributeClasses={attributeClasses}
      // responseCount={responseCount}
      // membershipRole={currentUserMembership?.role}
      // colors={SURVEY_BG_COLORS}
      // segments={segments}
      // isUserTargetingAllowed={isUserTargetingAllowed}
      // isMultiLanguageAllowed={isMultiLanguageAllowed}
      // isFormbricksCloud={IS_FORMBRICKS_CLOUD}
      // isUnsplashConfigured={UNSPLASH_ACCESS_KEY ? true : false}
    />
  );
};