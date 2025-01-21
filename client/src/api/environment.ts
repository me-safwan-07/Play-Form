import { TEnvironment } from "@/types/environment";

export const getEnvironments = async (userId: String): Promise<TEnvironment[]> => {
    const response = await fetch(`/api/environments/${userId}`);
    const environments = await response.json();
    return environments;
}