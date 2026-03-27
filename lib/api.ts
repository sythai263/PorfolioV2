import { Profile, TechStack } from "@app-types";
import { ApiResponse } from "@lib";

// API base configuration
const API_BASE_URL = "/api";

// Generic fetch wrapper with standardized response handling
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const apiResponse: ApiResponse<T> = await response.json();

    if (!apiResponse.success) {
      throw new Error(apiResponse.error || "API request failed");
    }

    return apiResponse.data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Profile API service
export const profileApi = {
  getProfile: (): Promise<Profile> => {
    return apiRequest<Profile>("/profile");
  },
};

// Tech Stack API service
export const techStackApi = {
  getTechStack: (): Promise<TechStack[]> => {
    return apiRequest<TechStack[]>("/tech-stack");
  },
};

// Experiences API service
export const experiencesApi = {
  getExperiences: (): Promise<Experience[]> => {
    return apiRequest<Experience[]>("/experiences");
  },
};

// Generic API client
export const apiClient = {
  get: <T>(endpoint: string): Promise<T> => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, data?: any): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: <T>(endpoint: string, data?: any): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: <T>(endpoint: string): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "DELETE",
    }),
};
