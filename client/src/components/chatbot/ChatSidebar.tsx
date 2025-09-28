import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Archive,
  Settings,
  Bot,
  User,
  Clock,
  Heart,
  Sparkles
} from 'lucide-react'
import { chatbotService, ChatSession } from '@services/chatbotService'
import toast from 'react-hot-toast'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  onSessionSelect: (sessionId: string | null) => void
  activeSessionId: string | null
}

const ChatSidebar = ({ isOpen, onClose, onSessionSelect, activeSessionId }: ChatSidebarProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)

  // Load chat sessions
  const loadSessions = async () => {
    setLoading(true)
    try {
      const response = await chatbotService.getChatSessions(1, 20)
      if (response.success) {
        setSessions(response.data.sessions)
      } else {
        throw new Error(response.message || 'Failed to load sessions')
      }
    } catch (error: any) {
      console.error('Error loading sessions:', error)
      
      // More specific error handling
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.')
      } else if (error.response?.status >= 500) {
        toast.error('Server error. Please try again later.')
      } else {
        toast.error('Failed to load chat history')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadSessions()
    }
  }, [isOpen])

  // Filter sessions based on search
  const filteredSessions = sessions.filter(session =>
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle new chat
  const handleNewChat = () => {
    onSessionSelect(null)
    setShowNewChat(false)
    onClose()
    toast.success('Started new conversation')
  }

  // Handle session selection
  const handleSessionSelect = (sessionId: string) => {
    onSessionSelect(sessionId)
    onClose()
  }

  // Handle session deletion
  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await chatbotService.endChatSession(sessionId)
      if (response.success) {
        setSessions(prev => prev.filter(s => s.sessionId !== sessionId))
        if (activeSessionId === sessionId) {
          onSessionSelect(null)
        }
        toast.success('Chat session deleted')
      } else {
        throw new Error(response.message || 'Failed to delete session')
      }
    } catch (error: any) {
      console.error('Error deleting session:', error)
      
      // More specific error handling
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.')
      } else if (error.response?.status === 404) {
        toast.error('Session not found')
        // Remove from local state if not found on server
        setSessions(prev => prev.filter(s => s.sessionId !== sessionId))
      } else if (error.response?.status >= 500) {
        toast.error('Server error. Please try again later.')
      } else {
        toast.error('Failed to delete session')
      }
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Only on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[80] lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-[90] flex flex-col shadow-lg lg:relative lg:translate-x-0 lg:shadow-none"
          >
            {/* Header */}
            <div className="flex items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-light text-gray-900">Chat History</h2>
                  <p className="text-lg text-gray-600">Your conversations</p>
                </div>
              </div>
            </div>

            {/* New Chat Button */}
            <div className="p-6 border-b border-gray-200">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium">New Chat</span>
              </button>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-6">
                  <div className="h-12 w-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {searchQuery ? 'Try a different search term' : 'Start a new chat to begin'}
                  </p>
                </div>
              ) : (
                <div className="p-3">
                  {filteredSessions.map((session) => (
                    <div
                      key={session.sessionId}
                      className={`group relative p-4 rounded-lg cursor-pointer transition-colors duration-200 mb-2 ${
                        activeSessionId === session.sessionId
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSessionSelect(session.sessionId)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          activeSessionId === session.sessionId
                            ? 'bg-blue-600'
                            : 'bg-gray-100'
                        }`}>
                          <MessageSquare className={`h-5 w-5 ${
                            activeSessionId === session.sessionId
                              ? 'text-white'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className={`text-sm font-semibold truncate ${
                              activeSessionId === session.sessionId
                                ? 'text-blue-900'
                                : 'text-gray-900'
                            }`}>
                              {session.lastMessage.substring(0, 50)}
                              {session.lastMessage.length > 50 ? '...' : ''}
                            </p>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                activeSessionId === session.sessionId
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {session.messageCount}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {formatDate(session.updatedAt)}
                            </span>
                          </div>
                        </div>

                        {/* Actions Menu */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => handleDeleteSession(session.sessionId, e)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            title="Delete conversation"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm">
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Leher AI</p>
                  <p className="text-sm text-gray-600">Mental Health Companion</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ChatSidebar
