import axios from 'axios'
import { LoginCredentials, RegisterData, User, ApiResponse } from '@types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage')
    if (token) {
      try {
        const authData = JSON.parse(token)
        if (authData.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`
        }
      } catch (error) {
        console.error('Error parsing auth token:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Only handle 401 errors for protected routes (not login/register)
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/auth/login') &&
        !originalRequest.url?.includes('/auth/register') &&
        !originalRequest.url?.includes('/auth/forgot-password') &&
        !originalRequest.url?.includes('/auth/reset-password')) {
      
      originalRequest._retry = true

      // Clear invalid token and redirect to login
      localStorage.removeItem('auth-storage')
      
      // Only redirect if we're not already on the login page and not on auth pages
      const currentPath = window.location.pathname
      if (!currentPath.startsWith('/auth/')) {
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error)
  }
)

export const authService = {
  // Authentication endpoints
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/logout')
    return response.data
  },


  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/reset-password', { token, password })
    return response.data
  },

  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await api.post('/auth/verify-email', { token })
    return response.data
  },

  resendVerification: async (): Promise<ApiResponse> => {
    const response = await api.post('/auth/resend-verification')
    return response.data
  },

  // Profile endpoints
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/auth/profile', data)
    return response.data
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse> => {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    })
    return response.data
  },

  deleteAccount: async (password: string): Promise<ApiResponse> => {
    const response = await api.delete('/auth/account', {
      data: { password },
    })
    return response.data
  },
}

export default api
