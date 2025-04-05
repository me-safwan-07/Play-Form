import axios from "axios";

export const login = async (data: {
    email: string;
    password: string;
}) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', data);
    if (response.status !== 200) {
        return response.data;
    }

    return response.data.token;
}

export const signup = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const response = await axios.post('http://localhost:3000/api/auth/signup', data);
    return response.data.token;
}