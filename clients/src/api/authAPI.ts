import axios from "axios";
import API from "./axiosInstance";
import { TUser } from "@/types/user";
import { API_URL } from "@/lib/constants";
// import { AuthResponse, LoginCredentials, SignupData } from "../types/authTypes";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    data: TUser;
    status: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
}


export const signUp = async (userData: SignupData): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>("/auth/signup", userData);
    return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>("/auth/login", credentials);
    return response.data;
};

export const getUser = async (): Promise<AuthResponse> => {
    const response = await API.get<AuthResponse>("/auth/user/");
    return response.data;
};

export const googleAuth = async (inviteUrl: string): Promise<string> => {
    const response = await axios.get<AuthResponse["token"]>(`http://localhost:3000/api/auth/google?code=${inviteUrl}`);
    console.log(inviteUrl)
    return response.data;
};

export const getToken = async (userId: string, userEmail: string, expiresIn: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/auth/gettoken`, {userId, userEmail, expiresIn});
    return response.data.token;
}