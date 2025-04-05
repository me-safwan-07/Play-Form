import { hashPassword } from "@/utils/auth";

interface UserResponse {
    id: string;
    name: string;
    email: string;
}

export const createUser = async (
    name: string,
    email: string,
    password: string,
): Promise<UserResponse> => {
    const hashedPassword = await hashPassword(password);
    try {
        const res = await fetch('/api/v1/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name, 
                email, 
                password: hashedPassword 
            }),
        });
        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error());
        }
        return await res.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred');
    }
};

export const resendVerificationEmail = async (email: string) => {
    try {
        const res = await fetch('/api/v1/users/verification-email', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error());
        }
        return await res.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred');
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const res = await fetch('/api/v1/users/forgot-password', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error());
        }
        return await res.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred');
    }
};

export const resetPassword = async (token: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    try {
        const res = await fetch('/api/v1/users/reset-password', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                token, 
                password: hashedPassword 
            }),
        });

        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error());
        }
        return await res.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred');
    }
};