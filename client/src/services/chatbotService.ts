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

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isCrisis?: boolean
}

export interface ChatSession {
  sessionId: string
  lastMessage: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

export interface SendMessageResponse {
  message: string
  sessionId: string
  isCrisis: boolean
  timestamp: string
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
  }

}

export default chatbotService
