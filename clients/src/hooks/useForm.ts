import { useEffect, useState } from "react";
import { TForm } from "../types/forms";

const useForm = (apiFunction: () => Promise<TForm[]>) => {
    const [forms, setForms] = useState<TForm[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        const fetchForms = async () => {
            try {
                const result = await apiFunction();
                setForms(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchForms();
    }, [apiFunction]);

    return { forms, loading, error };
};

export default useForm;