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

// Community Types
export interface CommunityPost {
  _id: string
  author: {
    _id: string
    firstName: string
    lastName: string
    profile?: {
      avatar?: string
    }
  }
  title: string
  content: string
  category: string
  tags: string[]
  images?: string[]
  isAnonymous: boolean
  isPinned: boolean
  isLocked: boolean
  likes: string[]
  dislikes: string[]
  comments: string[] | CommunityComment[] // Can be IDs or populated comments
  views: number
  shares: number
  isReported: boolean
  reportReason?: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
  // Virtuals
  likeCount: number
  dislikeCount: number
  commentCount: number
}

export interface CommunityComment {
  _id: string
  post: string
  author: {
    _id: string
    firstName: string
    lastName: string
    profile?: {
      avatar?: string
    }
  }
  content: string
  parentComment?: string
  replies: string[] | CommunityComment[] // Can be IDs or populated replies
  likes: string[]
  dislikes: string[]
  isEdited: boolean
  editedAt?: string
  isDeleted: boolean
  deletedAt?: string
  isReported: boolean
  reportReason?: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
  // Virtuals
  likeCount: number
  dislikeCount: number
  replyCount: number
}

export interface CommunityCategory {
  value: string
  label: string
  description: string
}

export interface CreatePostData {
  title: string
  content: string
  category: string
  tags?: string[]
  images?: string[]
  isAnonymous?: boolean
}

export interface UpdatePostData {
  title?: string
  content?: string
  category?: string
  tags?: string[]
  images?: string[]
  isAnonymous?: boolean
}

export interface CreateCommentData {
  content: string
  parentComment?: string
}

export interface UpdateCommentData {
  content: string
}

export interface GetPostsParams {
  page?: number
  limit?: number
  category?: string
  tags?: string | string[]
  search?: string
  sortBy?: 'createdAt' | 'popular' | 'trending'
  sortOrder?: 'asc' | 'desc'
}

export interface GetCommentsParams {
  page?: number
  limit?: number
}

export const communityService = {
  // Post endpoints
  getPosts: async (params?: GetPostsParams): Promise<ApiResponse<{
    posts: CommunityPost[]
    pagination: {
      currentPage: number
      totalPages: number
      totalPosts: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>> => {
    try {
      console.log('Fetching posts from:', `${API_BASE_URL}/community/posts`, 'with params:', params)
      const response = await api.get('/community/posts', { params })
      console.log('Posts response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  },

  getPost: async (id: string, params?: GetCommentsParams): Promise<ApiResponse<CommunityPost>> => {
    const response = await api.get(`/community/posts/${id}`, { params })
    return response.data
  },

  createPost: async (data: CreatePostData): Promise<ApiResponse<CommunityPost>> => {
    const response = await api.post('/community/posts', data)
    return response.data
  },

  updatePost: async (id: string, data: UpdatePostData): Promise<ApiResponse<CommunityPost>> => {
    const response = await api.put(`/community/posts/${id}`, data)
    return response.data
  },

  deletePost: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/community/posts/${id}`)
    return response.data
  },

  likePost: async (id: string): Promise<ApiResponse<{
    isLiked: boolean
    likeCount: number
    dislikeCount: number
  }>> => {
    const response = await api.post(`/community/posts/${id}/like`)
    return response.data
  },

  dislikePost: async (id: string): Promise<ApiResponse<{
    isDisliked: boolean
    likeCount: number
    dislikeCount: number
  }>> => {
    const response = await api.post(`/community/posts/${id}/dislike`)
    return response.data
  },

  reportPost: async (id: string, reason: string): Promise<ApiResponse> => {
    const response = await api.post(`/community/posts/${id}/report`, { reason })
    return response.data
  },

  // Comment endpoints
  createComment: async (postId: string, data: CreateCommentData): Promise<ApiResponse<CommunityComment>> => {
    const response = await api.post(`/community/posts/${postId}/comments`, data)
    return response.data
  },

  updateComment: async (id: string, data: UpdateCommentData): Promise<ApiResponse<CommunityComment>> => {
    const response = await api.put(`/community/comments/${id}`, data)
    return response.data
  },

  deleteComment: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/community/comments/${id}`)
    return response.data
  },

  likeComment: async (id: string): Promise<ApiResponse<{
    isLiked: boolean
    likeCount: number
    dislikeCount: number
  }>> => {
    const response = await api.post(`/community/comments/${id}/like`)
    return response.data
  },

  dislikeComment: async (id: string): Promise<ApiResponse<{
    isDisliked: boolean
    likeCount: number
    dislikeCount: number
  }>> => {
    const response = await api.post(`/community/comments/${id}/dislike`)
    return response.data
  },

  reportComment: async (id: string, reason: string): Promise<ApiResponse> => {
    const response = await api.post(`/community/comments/${id}/report`, { reason })
    return response.data
  },

  getCommentReplies: async (id: string, params?: GetCommentsParams): Promise<ApiResponse<{
    replies: CommunityComment[]
    pagination: {
      currentPage: number
      totalPages: number
      totalReplies: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>> => {
    const response = await api.get(`/community/comments/${id}/replies`, { params })
    return response.data
  },

  // Category endpoints
  getCategories: async (): Promise<ApiResponse<CommunityCategory[]>> => {
    try {
      console.log('Fetching categories from:', `${API_BASE_URL}/community/categories`)
      const response = await api.get('/community/categories')
      console.log('Categories response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }
}

export default communityService
