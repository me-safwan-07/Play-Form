import axios from "axios";
// import { axiosInstance } from "../config/axios";
// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();
export const getFirstEnvironmentByUserId = async (token: string | null): Promise<string> => {
    try {
        const response = await axios.get('http://localhost:3000/api/environment',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.data && response.data.length > 0) {
            return response.data;
        }
        // navigate('/auth/register');
        throw new Error('No environments found for user');
    } catch (error) {
        console.error('Error fetching environments:', error);
        throw error;
    }
};
