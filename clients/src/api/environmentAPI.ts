import API from "./axiosInstance";

export const getEnvironmentId = async (): Promise<string> => {
    try {
        const response = await API.get('/environment');
        return response.data.token;
    } catch (error) {
        console.error('Error fetching environmentId:', error);
        throw error;
    }
};
