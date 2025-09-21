import { ApiResponse } from '@types'
import api from './api'

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
        // Fallback: try to get token directly from localStorage
        const directToken = localStorage.getItem('token')
        if (directToken) {
          config.headers.Authorization = `Bearer ${directToken}`
        }
      }
    } else {
      // Fallback: try to get token directly from localStorage
      const directToken = localStorage.getItem('token')
      if (directToken) {
        config.headers.Authorization = `Bearer ${directToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isCrisis?: boolean
  crisisSeverity?: 'low' | 'medium' | 'high' | 'critical'
  crisisConfidence?: number
  crisisKeywords?: string[]
  isEncrypted?: boolean
  originalContent?: string
  decryptionError?: string
}

export interface ChatSession {
  sessionId: string
  lastMessage: string
  messageCount: number
  createdAt: string
  updatedAt: string
  crisisCount?: number
  hasEncryptedMessages?: boolean
}

export interface SendMessageResponse {
  message: string
  sessionId: string
  isCrisis: boolean
  crisisSeverity?: 'low' | 'medium' | 'high' | 'critical'
  crisisConfidence?: number
  crisisKeywords?: string[]
  timestamp: string
  containsSensitiveInfo?: boolean
  sanitizedMessage?: string
}

export interface ChatHistoryResponse {
  sessionId: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}


export const chatbotService = {
  // Send a message to the chatbot
  sendMessage: async (message: string, sessionId?: string | null): Promise<ApiResponse<SendMessageResponse>> => {
    const response = await api.post('/chatbot/message', {
      message,
      sessionId
    })
    return response.data
  },

  // Get chat history for a specific session
  getChatHistory: async (sessionId: string): Promise<ApiResponse<ChatHistoryResponse>> => {
    const response = await api.get(`/chatbot/history/${sessionId}`)
    return response.data
  },

  // Get user's chat sessions
  getChatSessions: async (page: number = 1, limit: number = 10): Promise<ApiResponse<{
    sessions: ChatSession[]
    pagination: {
      currentPage: number
      totalPages: number
      totalSessions: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>> => {
    const response = await api.get('/chatbot/sessions', {
      params: { page, limit }
    })
    return response.data
  },

  // End a chat session
  endChatSession: async (sessionId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/chatbot/sessions/${sessionId}`)
    return response.data
  },

  // Get wellness tips
  getWellnessTips: async (): Promise<ApiResponse<{ tips: string[], timestamp: string }>> => {
    const response = await api.get('/chatbot/wellness-tips')
    return response.data
  },

  // Track user mood
  trackMood: async (mood: number, notes?: string, sessionId?: string): Promise<ApiResponse<{
    mood: number
    timestamp: string
    message: string
  }>> => {
    const response = await api.post('/chatbot/mood', {
      mood,
      notes,
      sessionId
    })
    return response.data
  }

}

export default chatbotService
