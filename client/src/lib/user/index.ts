import { signInWithPopup } from "firebase/auth";
import { hashPassword } from "../auth";
import { auth, googleProvider } from "@/lib/firebase-config";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  inviteToken?: string | null
): Promise<void> => {
  const hashedPassword = await hashPassword(password);
  try {
    const res = await fetch(`/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password: hashedPassword,
        inviteToken,
      }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw new Error(json.error);
    }
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const resendVerificationEmail = async (email: string): Promise<void> => {
  try {
    const res = await fetch(`/api/v1/users/verification-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw new Error(json.error);
    }
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await fetch(`/api/v1/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw new Error(json.error);
    }
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  const hashedPassword = await hashPassword(password);
  try {
    const res = await fetch(`/api/v1/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        hashedPassword,
      }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw new Error(json.error);
    }
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const deleteUser = async (): Promise<void> => {
  try {
    const res = await fetch("/api/v1/users/me/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw new Error(json.error);
    }
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();

    const response = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const userData = await response.json();
    return userData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during sign-in:", error.message);
    } else {
      console.error("Unknown error during sign-in");
    }
  }
};
