import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Initialize authorization header on app startup (for persistent sessions)
const token = localStorage.getItem('auth_token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Utility function to set/clear auth token
export function setAuthToken(token: string | null): void {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('auth_token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('auth_token');
  }
}

export interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    user: any;
    token: string;
  };
  errors?: Record<string, string[]>;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/login", { email, password });
    console.log("API RAW RESPONSE", response);
    if (response.data.status === 'success' && response.data.data?.token) {
      setAuthToken(response.data.data.token);
    }
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      return {
        status: 'error',
        message: (error.response as any)?.data?.message || 'Authentication failed',
        errors: (error.response as any)?.data?.errors
      };
    }
    return {
      status: 'error',
      message: 'Authentication failed. Please check your network connection.'
    };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    // Call the backend logout endpoint if you have one
    await api.post("/logout");
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Use the utility function instead of direct manipulation
    setAuthToken(null);
  }
}

// Add interceptor to include auth token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // Use type assertion to avoid TypeScript errors
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;