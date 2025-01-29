import { axiosInstance } from "@/config/axios";
import axios from "axios";

export const login = async (data: {
    email: string;
    password: string;
}) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', data);
    if (response.status !== 200) {
        throw new Error("Failed to login");
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