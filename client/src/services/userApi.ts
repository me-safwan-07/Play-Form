import toast from "react-hot-toast";
import { userEndPoints } from "./api";
import axios from "axios";

const { GET_USER_BY_ID } = userEndPoints;

export const getUserById = async (userId: string) => {
  const toastId = toast.loading('Loading user details...');
  
  try {
    const response = await axios.get(`${GET_USER_BY_ID}/${userId}`);
    
    if (response.data && response.data.id) {
      return {
        success: true,
        data: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          emailVerified: response.data.emailVerified || null,
          imageUrl: response.data.imageUrl || '',
          createdAt: new Date(response.data.createdAt),
          updatedAt: new Date(response.data.updatedAt),
          identityProvider: response.data.identityProvider
        }
      };
    } else {
      throw new Error("Invalid user data received");
    }
  } catch (error) {
    console.error("GET_USER_BY_ID API error:", error);
    toast.error("Failed to load user details");
    return { success: false, error: "Failed to fetch user" };
  } finally {
    toast.dismiss(toastId);
  }
};
