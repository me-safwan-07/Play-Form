import { useState, useEffect } from "react";

type FetchFunction<T> = () => Promise<T>;

const useFetch = <T>(apiFunction: FetchFunction<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiFunction();
                console.log(result);
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiFunction]);

    return { data, loading, error };
};

export default useFetch;
