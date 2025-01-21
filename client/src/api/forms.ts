import { TFormFilterCriteria } from "@/types/forms";

export const getFormCount = async (environmentId: string): Promise<number> => {
    const response = await fetch(`/api/forms/count/${environmentId}`);
    const count = await response.json();
    return count;
};

export const getForm = async (
    formId: string,
    limit?: number,
    offset?: number,
    filterCriteria?: TFormFilterCriteria
): Promise<any> => {
    // write the token authentication logic here
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(`/api/forms/${formId}`, {
        headers,
        method: "POST",
        body: JSON.stringify({
            limit,
            offset,
            filterCriteria,
        }),
    });
    const form = await response.json();
    return form;
};