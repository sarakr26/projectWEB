import { authApi } from '@/src/lib/api';
import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


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
      const response = await authApi.login({ 
        email, 
        password 
      });
      
      if (response.data.status === 'success' && response.data.data?.token) {
        // Store the token in localStorage
        localStorage.setItem('auth_token', response.data.data.token);
        
        // Set the token for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
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
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token regardless of API success
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
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