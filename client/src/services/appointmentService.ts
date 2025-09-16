import axios from 'axios'
import { ApiResponse } from '@types'

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

// Types
export interface Appointment {
  _id: string
  studentId: string
  counselorId: string
  date: string
  time: string
  duration: number
  type: 'individual' | 'group' | 'emergency'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  meetingLink?: string
  location?: string
  studentNotes?: string
  counselorNotes?: string
  rating?: number
  feedback?: string
  createdAt: string
  updatedAt: string
  student?: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  counselor?: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
}

export interface Counselor {
  _id: string
  userId: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  specialization: string[]
  experience: number
  languages: string[]
  availability: Availability[]
  rating: number
  totalSessions: number
  bio: string
  qualifications: string[]
  isAvailable: boolean
  consultationFee?: number
  maxSessionsPerDay: number
  currentSessionsToday: number
}

export interface Availability {
  dayOfWeek: number
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface AvailableSlot {
  time: string
  duration: number
  available: boolean
}

export interface CreateAppointmentData {
  counselorId: string
  date: string
  time: string
  duration?: number
  type?: 'individual' | 'group' | 'emergency'
  notes?: string
  studentNotes?: string
}

export interface UpdateAppointmentData {
  notes?: string
  studentNotes?: string
  counselorNotes?: string
  meetingLink?: string
  location?: string
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
}

export interface RateAppointmentData {
  rating: number
  feedback?: string
}

export interface GetAppointmentsParams {
  status?: string
  type?: string
  page?: number
  limit?: number
}

export interface GetCounselorsParams {
  specialization?: string | string[]
  language?: string | string[]
  date?: string
  time?: string
}

export const appointmentService = {
  // Get user's appointments
  getAppointments: async (params?: GetAppointmentsParams): Promise<ApiResponse<{
    appointments: Appointment[]
    pagination: {
      currentPage: number
      totalPages: number
      totalAppointments: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>> => {
    const response = await api.get('/appointments', { params })
    return response.data
  },

  // Get single appointment
  getAppointment: async (id: string): Promise<ApiResponse<Appointment>> => {
    const response = await api.get(`/appointments/${id}`)
    return response.data
  },

  // Create new appointment
  createAppointment: async (data: CreateAppointmentData): Promise<ApiResponse<Appointment>> => {
    const response = await api.post('/appointments', data)
    return response.data
  },

  // Update appointment
  updateAppointment: async (id: string, data: UpdateAppointmentData): Promise<ApiResponse<Appointment>> => {
    const response = await api.put(`/appointments/${id}`, data)
    return response.data
  },

  // Cancel appointment
  cancelAppointment: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/appointments/${id}`)
    return response.data
  },

  // Get available counselors
  getAvailableCounselors: async (params?: GetCounselorsParams): Promise<ApiResponse<Counselor[]>> => {
    const response = await api.get('/appointments/counselors', { params })
    return response.data
  },

  // Get available time slots for a counselor
  getAvailableSlots: async (counselorId: string, date: string): Promise<ApiResponse<{
    counselor: any
    date: string
    availableSlots: AvailableSlot[]
  }>> => {
    const response = await api.get(`/appointments/counselors/${counselorId}/slots`, {
      params: { date }
    })
    return response.data
  },

  // Rate appointment
  rateAppointment: async (id: string, data: RateAppointmentData): Promise<ApiResponse> => {
    const response = await api.post(`/appointments/${id}/rate`, data)
    return response.data
  }
}

export const counselorService = {
  // Get counselor profile
  getCounselorProfile: async (): Promise<ApiResponse<Counselor>> => {
    const response = await api.get('/counselors/profile')
    return response.data
  },

  // Create or update counselor profile
  createOrUpdateCounselorProfile: async (data: any): Promise<ApiResponse<Counselor>> => {
    const response = await api.post('/counselors/profile', data)
    return response.data
  },

  // Update counselor availability
  updateAvailability: async (data: { availability: Availability[], isAvailable?: boolean }): Promise<ApiResponse<Counselor>> => {
    const response = await api.put('/counselors/availability', data)
    return response.data
  },

  // Get counselor statistics
  getCounselorStats: async (): Promise<ApiResponse<{
    totalAppointments: number
    completedAppointments: number
    upcomingAppointments: number
    todayAppointments: number
    averageRating: number
    totalSessions: number
    rating: number
    isAvailable: boolean
  }>> => {
    const response = await api.get('/counselors/stats')
    return response.data
  },

  // Get all counselors (admin only)
  getAllCounselors: async (params?: {
    page?: number
    limit?: number
    specialization?: string | string[]
    isAvailable?: boolean
  }): Promise<ApiResponse<{
    counselors: Counselor[]
    pagination: {
      currentPage: number
      totalPages: number
      totalCounselors: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>> => {
    const response = await api.get('/counselors', { params })
    return response.data
  }
}

export default appointmentService
