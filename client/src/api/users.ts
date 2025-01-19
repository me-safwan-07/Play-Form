export const createUser = async (
    name: string,
    email: string,
    password: string,
    inviteToken?: string | null
): Promise<any> => {
    try {
        const res = await fetch(`/api/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                inviteToken
            }),
        });
        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}

export const resendVerificationEmail = async (email: string): Promise<any> => {
    try {
        const res = await fetch(`/api/v1/users/verification_email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            }),
        });
        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const res = await fetch(`/api/v1/users/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            }),
        });

        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
        const res = await fetch(`/api/v1/users/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                password
            }),
        });
        if (res.status !== 200) {
            const json = await res.json();
            throw new Error(json.error);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
};

export const deleteUser = async (): Promise<void> => {
    try {
        const res = await fetch(`/api/v1/users/me/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (res.status!== 200) {
            const json = await res.json();
            throw new Error(json.error);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}