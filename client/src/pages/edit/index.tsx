import { useState } from 'react';
import { FormEditor } from './components/FormEditor';
import axios from 'axios';
import { ErrorComponent } from '@/components/ui/ErrorComponent';

export const Edit = () => {
  const [form, setForm] = useState();
  useState(() => {
    const fetchForm = async () => {
      const res = await axios.get('http://localhost:3000/api/forms/676691f0fa81f9109888c6a7');
      if (res.status === 200) {
        setForm(res.data);
      } else {
        console.error('Failed to fetch form data');
      }
    }

    fetchForm();
  });

  if (!form) {
    return <ErrorComponent />
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