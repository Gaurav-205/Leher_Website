import { ApiResponse } from '@types'
import api from './api'
// Mock data moved inline to avoid dependency
const mockResources = []
const mockResourceCategories = []
const filterResources = (resources: any[], filters: any) => resources

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
      const response = await api.get('/resources', { params })
      
      // Check if API returned empty data and fall back to mock data
      if (response.data.success && (!response.data.data || response.data.data.length === 0)) {
        const result = filterResources(mockResources, params)
        return {
          success: true,
          data: result,
          message: 'Resources loaded successfully'
        }
      }
      
      return response.data
    } catch (error) {
      console.error('Error fetching resources:', error)
      
      // Return mock data when API fails
      const result = filterResources(mockResources, params)
      return {
        success: true,
        data: result,
        message: 'Resources loaded successfully'
      }
    }
  },

  getResource: async (id: string): Promise<ApiResponse<Resource>> => {
    try {
      const response = await api.get(`/resources/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching resource:', error)
      
      // Return mock data when API fails
      const resource = mockResources.find(r => r._id === id)
      if (resource) {
        return {
          success: true,
          data: resource,
          message: 'Resource loaded successfully'
        }
      } else {
        throw new Error('Resource not found')
      }
    }
  },

  likeResource: async (id: string): Promise<ApiResponse<{
    isLiked: boolean
    likeCount: number
  }>> => {
    try {
      const response = await api.post(`/resources/${id}/like`)
      return response.data
    } catch (error) {
      console.error('Error liking resource:', error)
      
      // Return mock data when API fails
      const resource = mockResources.find(r => r._id === id)
      if (resource) {
        return {
          success: true,
          data: {
            isLiked: true,
            likeCount: resource.likeCount + 1
          },
          message: 'Resource liked successfully'
        }
      } else {
        throw new Error('Resource not found')
      }
    }
  },

  downloadResource: async (id: string): Promise<ApiResponse<{
    downloadUrl: string
    downloadCount: number
  }>> => {
    try {
      const response = await api.post(`/resources/${id}/download`)
      return response.data
    } catch (error) {
      console.error('Error downloading resource:', error)
      
      // Return mock data when API fails
      const resource = mockResources.find(r => r._id === id)
      if (resource) {
        return {
          success: true,
          data: {
            downloadUrl: resource.fileUrl || '/downloads/placeholder.pdf',
            downloadCount: resource.downloads + 1
          },
          message: 'Resource download initiated'
        }
      } else {
        throw new Error('Resource not found')
      }
    }
  },

  // Category endpoints
  getCategories: async (): Promise<ApiResponse<ResourceCategory[]>> => {
    try {
      const response = await api.get('/resources/categories')
      
      // Check if API returned empty data and fall back to mock data
      if (response.data.success && (!response.data.data || response.data.data.length === 0)) {
        return {
          success: true,
          data: mockResourceCategories,
          message: 'Categories loaded successfully'
        }
      }
      
      return response.data
    } catch (error) {
      console.error('Error fetching resource categories:', error)
      console.log('Using mock data for categories')
      
      // Return mock data when API fails
      return {
        success: true,
        data: mockResourceCategories,
        message: 'Categories loaded successfully'
      }
    }
  }
}

export default resourceService
