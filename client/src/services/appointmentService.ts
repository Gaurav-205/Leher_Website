import { ApiResponse } from '@types'
import api from './api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

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

// Appointment Types
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
  // Populated fields
  student?: {
    _id: string
    firstName: string
    lastName: string
    email: string
    profile?: {
      avatar?: string
    }
  }
  counselor?: {
    _id: string
    firstName: string
    lastName: string
    email: string
    profile?: {
      avatar?: string
    }
  }
}

export interface Counselor {
  _id: string
  userId: {
    _id: string
    firstName: string
    lastName: string
    email: string
    profile?: {
      avatar?: string
    }
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
  currentSessionsToday: number
  createdAt: string
  updatedAt: string
}

export interface Availability {
  dayOfWeek: number
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface CreateAppointmentData {
  counselorId: string
  date: string
  time: string
  duration?: number
  type?: 'individual' | 'group' | 'emergency'
  notes?: string
  location?: string
}

export interface UpdateAppointmentData {
  date?: string
  time?: string
  duration?: number
  type?: 'individual' | 'group' | 'emergency'
  notes?: string
  location?: string
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  meetingLink?: string
}

export interface GetAppointmentsParams {
  page?: number
  limit?: number
  status?: string
  type?: string
}

export const appointmentService = {
  // Get all appointments for the current user
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
    try {
      const response = await api.get('/appointments', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching appointments:', error)
      throw error
    }
  },

  // Get single appointment
  getAppointment: async (id: string): Promise<ApiResponse<Appointment>> => {
    try {
      const response = await api.get(`/appointments/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching appointment:', error)
      throw error
    }
  },

  // Create new appointment
  createAppointment: async (data: CreateAppointmentData): Promise<ApiResponse<Appointment>> => {
    try {
      const response = await api.post('/appointments', data)
      return response.data
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  },

  // Update appointment
  updateAppointment: async (id: string, data: UpdateAppointmentData): Promise<ApiResponse<Appointment>> => {
    try {
      const response = await api.put(`/appointments/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating appointment:', error)
      throw error
    }
  },

  // Cancel appointment
  cancelAppointment: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/appointments/${id}`)
      return response.data
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      throw error
    }
  },

  // Get available counselors
  getAvailableCounselors: async (params?: {
    specialization?: string
    date?: string
    time?: string
  }): Promise<ApiResponse<Counselor[]>> => {
    try {
      const response = await api.get('/appointments/counselors', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching available counselors:', error)
      throw error
    }
  },

  // Get counselor availability
  getCounselorAvailability: async (counselorId: string, date?: string): Promise<ApiResponse<Availability[]>> => {
    try {
      const params = date ? { date } : {}
      const response = await api.get(`/appointments/counselors/${counselorId}/availability`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching counselor availability:', error)
      throw error
    }
  }
}

export default appointmentService
