import api from './api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Interfaces
export interface DashboardStats {
  totalClients: number;
  totalPartners: number;
  totalListings: number;
  clientGrowth: Array<{
    month: string;
    clients: number;
  }>;
  clientManagement: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export interface AdminLoginResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    admin: {
      id: number;
      email: string;
      username: string;
    };
    token: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: 'client' | 'partner';
  status: 'active' | 'archived';
  phone_number?: string;
  address?: string;
  created_at: string;
  city?: {
    id: number;
    name: string;
  };
}

export interface UsersResponse {
  status: string;
  data: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Token handler
const handleToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Admin service
export const adminService = {
  login: async (credentials: { email: string; password: string }): Promise<AdminLoginResponse> => {
    try {
      const response = await api.post<AdminLoginResponse>('/admin/login', credentials);
      
      if (response.data.status === 'success' && response.data.data?.token) {
        handleToken(response.data.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Authentication failed');
    }
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await api.get<{ status: string; data: DashboardStats }>('/admin/dashboard/stats');
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  },

  getUsers: async (params: {
    page?: number;
    per_page?: number;
    search?: string;
    role?: string;
    status?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }): Promise<UsersResponse> => {
    try {
      const response = await api.get<UsersResponse>('/admin/users', { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  getPartners: async (params: {
    search?: string;
    status?: string;
    type?: string;
    sort_by?: string;
    sort_order?: string;
    page?: number;
    per_page?: number;
  }) => {
    try {
        let token = "";
        if (typeof window !== "undefined") {
            token = localStorage.getItem('auth_token') || "";
        }
        console.log('Making request with token:', token); // Debug log
        const response = await axios.get(`${API_URL}/admin/partners`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data); // Debug log
        return response.data;
    } catch (error: any) {
        console.error('Error fetching partners:', error); // Debug log
        throw new Error(error.response?.data?.message || 'Failed to fetch partners');
    }
  },

  updatePartnerStatus: async (partnerId: number) => {
    try {
      const response = await api.patch(`/admin/partners/${partnerId}/status`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update partner status');
    }
  }
};

export default adminService;