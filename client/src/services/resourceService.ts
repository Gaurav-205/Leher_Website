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

// Resource Types
export interface Resource {
  _id: string
  title: string
  description: string
  content: string
  type: 'article' | 'video' | 'audio' | 'worksheet' | 'infographic'
  category: ResourceCategory
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration?: number // in minutes
  thumbnail?: string
  fileUrl?: string
  tags: string[]
  isPublished: boolean
  isFeatured: boolean
  views: number
  downloads: number
  likes: string[]
  author: {
    _id: string
    firstName: string
    lastName: string
    profile?: {
      avatar?: string
    }
  }
  createdAt: string
  updatedAt: string
  // Virtuals
  likeCount: number
}

export interface ResourceCategory {
  _id: string
  name: string
  description: string
  icon?: string
  color?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GetResourcesParams {
  page?: number
  limit?: number
  category?: string
  type?: string
  difficulty?: string
  language?: string
  search?: string
  sortBy?: 'createdAt' | 'views' | 'downloads' | 'likes' | 'title'
  sortOrder?: 'asc' | 'desc'
  featured?: boolean
}

export const resourceService = {
  // Resource endpoints
  getResources: async (params?: GetResourcesParams): Promise<ApiResponse<{
    resources: Resource[]
    pagination: {
      currentPage: number
      totalPages: number
      totalResources: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>> => {
    try {
      console.log('Fetching resources from:', `${API_BASE_URL}/resources`, 'with params:', params)
      const response = await api.get('/resources', { params })
      console.log('Resources response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching resources:', error)
      throw error
    }
  },

  getResource: async (id: string): Promise<ApiResponse<Resource>> => {
    const response = await api.get(`/resources/${id}`)
    return response.data
  },

  likeResource: async (id: string): Promise<ApiResponse<{
    isLiked: boolean
    likeCount: number
  }>> => {
    const response = await api.post(`/resources/${id}/like`)
    return response.data
  },

  downloadResource: async (id: string): Promise<ApiResponse<{
    downloadUrl: string
    downloadCount: number
  }>> => {
    const response = await api.post(`/resources/${id}/download`)
    return response.data
  },

  // Category endpoints
  getCategories: async (): Promise<ApiResponse<ResourceCategory[]>> => {
    try {
      console.log('Fetching resource categories from:', `${API_BASE_URL}/resources/categories`)
      const response = await api.get('/resources/categories')
      console.log('Resource categories response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching resource categories:', error)
      throw error
    }
  }
}

export default resourceService
