import { TForm } from "@/types/forms";
import axios from "axios";

interface FormResponse {
  forms: TForm[];
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}

export const getFormCount = async (token: string | null): Promise<number> => {
    try {
        const response = await axios.get('http://localhost:3000/api/forms/count/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.count;
    } catch (error) {
        console.error('Error fetching form count:', error);
        throw error;
    }
};

export const getForms = async (page = 1, limit = 10): Promise<FormResponse> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token");

    try {
        const response = await axios.get(`http://localhost:3000/api/forms`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forms:', error);
        throw error;
    }
};

export const getForm = async (formId: string): Promise<TForm> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token");

    try {
        const response = await axios.get(`http://localhost:3000/api/forms/${formId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.form;
    } catch (error) {
        console.error('Error fetching form:', error);
        throw error;
    }
};
