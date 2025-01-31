import { TForm } from "@/types/forms";
import API from "./axiosInstance";
import axiosInstance from "./axiosInstance";

// export const getForms = async (): Promise<TForm[]> => {
//     try {
//         const response = await API.get('/forms');
//         return response.data.forms;
//     } catch (error) {
//         console.error('Error fetching forms:', error);
//         throw error;
//     }
// };

export const getForms = async (): Promise<TForm> => {
    try {
        const res = await axiosInstance.get('/forms');
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error('Failed to fetch forms');
        }
    } catch (error) {
        console.error('Error fetching forms:', error);
        throw error;
    }
};

export const getForm = async (formId: string): Promise<TForm[]> => {
    const response = await API.get<TForm[]>(`/form/${formId}`);
    return response.data;
};

export const createForm = async (formData: Partial<TForm>): Promise<TForm> => {
    const response = await API.post<TForm>("/forms", formData);
    return response.data;
};

export const updateForm = async (formId: string, formData: Partial<TForm>): Promise<TForm> => {
    const response = await API.put<TForm>(`/forms/${formId}`, formData);
    return response.data;
};

export const deleteForm = async (formId: string): Promise<void> => {
    await API.delete(`/forms/${formId}`);
};

export const getFormCount = async (): Promise<number> => {
    const response = await API.get('/forms/count');
    return response.data.count;
};

// export const getForms = async (token: string | null): Promise<TForm> => {
//     try {
//         const res = await axiosInstance.get('/forms');
        
//         console.log(res);

//         return res.json();
//     } catch (error) {
//         console.error('Error fetching forms:', error);
//         throw error;
//     }
// };

