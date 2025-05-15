"use client"
import axios from 'axios'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// API base URL
const API_URL = 'http://localhost:8000/api'

interface User {
  id: string
  name: string
  email: string
  role: string
  username?: string
  phone_number?: string
  address?: string
  city_id?: number
  avatar?: string
  isVerified: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  username?: string
  phone_number?: string
  address?: string
  city_id?: number
  role?: string
}

// Generic API response type
interface ApiResponse {
  status: string
  data?: any
  message?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  signup: (userData: RegisterData) => Promise<void>
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  becomePartner: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Configure axios defaults
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        
        if (token) {
          // Set the auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Define the expected response type
          interface UserResponse {
            status: string
            data: User
          }

          // Get user data from the backend
          try {
            const response = await axios.get<UserResponse>(`${API_URL}/user`)
            if (response.data.status === 'success') {
              setUser(response.data.data)
            }
          } catch (apiError) {
            // Token might be invalid or expired
            console.error("API error:", apiError)
            localStorage.removeItem('auth_token')
            delete axios.defaults.headers.common['Authorization']
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    setIsLoading(true);
    try {
      interface LoginResponse {
        status: string;
        message?: string;
        data?: {
          user: User;
          token: string;
        };
      }
      const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
        email,
        password
      });
      if (response.data.status === 'success' && response.data.data) {
        const newUser = response.data.data.user;
        const token = response.data.data.token;
        localStorage.setItem('auth_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(newUser);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      interface RegisterResponse {
        status: string
        data: {
          user: User
          token: string
        }
        message?: string
      }

      const response = await axios.post<RegisterResponse>(`${API_URL}/register`, userData)
      
      if (response.data.status === 'success') {
        const newUser = response.data.data.user
        const token = response.data.data.token
        
        // Store the token
        localStorage.setItem('auth_token', token)
        
        // Set the auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        // Update the user state
        setUser(newUser)
        
        return
      } else {
        throw new Error(response.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error("Signup error:", error)
      
      if (error && typeof error === 'object' && 'response' in error && 
        error.response && typeof error.response === 'object' && 
        'data' in error.response) {
      throw new Error((error.response.data as any).message || 'Authentication failed')
    }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Call logout API if available
      const token = localStorage.getItem('auth_token')
      if (token) {
        await axios.post(`${API_URL}/logout`)
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage and state regardless of API success
      setUser(null)
      localStorage.removeItem('auth_token')
      delete axios.defaults.headers.common['Authorization']
      window.location.href = '/'; // Redirect to home page
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // In a real application, you would implement OAuth with Google
      // For now, we'll use mock data
      const mockUser: User = {
        id: "456",
        name: "Google User",
        email: "google@example.com",
        role: "client",
        isVerified: true,
      }

      setUser(mockUser)
      
      // In a real implementation, this would come from the backend after OAuth
      const mockToken = "google-mock-token"
      localStorage.setItem('auth_token', mockToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithFacebook = async () => {
    setIsLoading(true)
    try {
      // In a real application, you would implement OAuth with Facebook
      // For now, we'll use mock data
      const mockUser: User = {
        id: "789",
        name: "Facebook User",
        email: "facebook@example.com",
        role: "client",
        isVerified: true,
      }

      setUser(mockUser)
      
      // In a real implementation, this would come from the backend after OAuth
      const mockToken = "facebook-mock-token"
      localStorage.setItem('auth_token', mockToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`
    } catch (error) {
      console.error("Facebook login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const becomePartner = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Check if we have a token and user
      const token = localStorage.getItem('auth_token');
      if (!token || !user) {
        console.error("No authentication token or user found");
        return false;
      }
      
      // Make the API call to upgrade to partner
      const response = await axios.post<ApiResponse>(`${API_URL}/become-partner`);
      
      // Check if the call was successful
      if (response.data.status === 'success') {
        // Update the user with the new role
        setUser({
          ...user,
          role: 'partner'
        });
        return true;
      } else {
        console.error("Failed to upgrade to partner:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error upgrading to partner:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading: isLoading,
        login,
        signup,
        logout,
        loginWithGoogle,
        loginWithFacebook,
        becomePartner,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}