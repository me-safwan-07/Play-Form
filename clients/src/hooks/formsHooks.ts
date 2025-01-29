import { TForm, TFormFilterCriteria } from "@/types/forms";
import axios from "axios";
export const getFormCount = async (token: string | null): Promise<string> => {
    try {
        const response = await axios.get('http://localhost:3000/api/forms/count/',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status !== 200) {
            throw new Error('No environments found for user');
        }
        return response.data.count;
    } catch (error) {
        console.error('Error fetching environments:', error);
        throw error;
    }
};

export const getForm = async (formId: string): Promise<TForm> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/forms/${formId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch form');
    }

    const data = await response.json();
    return data.form;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};

export const getForms = async () => {
    const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token");
    const response = await fetch(`http://localhost:3000/api/forms/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: "POST",
        // body: JSON.stringify({
        //     limit: formsLimit,
        //     offset: forms.length,
        //     filterCriteria: filters
        // })
    });
    const data = await response.json();
    return data.forms;

}
