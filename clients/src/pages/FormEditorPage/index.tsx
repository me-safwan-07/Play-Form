import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormEditor } from './components/FormEditor';
import axios from 'axios';
import { ErrorComponent } from '@/components/ui/ErrorComponent';
import { TForm } from '@/types/forms';
// import { FORM_BG_COLORS } from '@/lib/constants';

export const FormEditorPage = () => {
  const { formId, environmentId } = useParams();
  const [form, setForm] = useState<TForm| null>(null);
  const responseCount = 0;

  if (!environmentId) {
    throw new Error("No environment ID")
  }

  useEffect(() => {
    if (!formId || !environmentId) return;
    const fetchForm = async () => {
      const res = await axios.get(`http://localhost:3000/api/form/${formId}`,
        {
          // withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.status === 200) {
        setForm(res.data.form);
      } else {
        console.error('Failed to fetch form data');
      }
    };

    fetchForm();
  }, [formId, environmentId]);

  if (!form) {
    return <ErrorComponent />;
  }

  return (
    <FormEditor 
      form={form}
      environmentId={environmentId}
      responseCount={responseCount}
    />
  );
};