import { LoginCredentials, RegisterData, User, ApiResponse } from '@types'
import api from './api'

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
