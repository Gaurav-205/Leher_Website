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
  Clock
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
      setSessions(response.data.sessions)
    } catch (error) {
      console.error('Error loading sessions:', error)
      toast.error('Failed to load chat history')
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
      await chatbotService.endChatSession(sessionId)
      setSessions(prev => prev.filter(s => s.sessionId !== sessionId))
      if (activeSessionId === sessionId) {
        onSessionSelect(null)
      }
      toast.success('Chat session deleted')
    } catch (error) {
      console.error('Error deleting session:', error)
      toast.error('Failed to delete session')
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 flex flex-col shadow-xl lg:relative lg:translate-x-0 lg:shadow-none"
          >
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
              </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>New Chat</span>
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <p className="text-sm">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredSessions.map((session) => (
                    <motion.div
                      key={session.sessionId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group relative p-3 rounded-lg cursor-pointer transition-colors duration-200 mb-2 ${
                        activeSessionId === session.sessionId
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSessionSelect(session.sessionId)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activeSessionId === session.sessionId
                            ? 'bg-primary-600'
                            : 'bg-gray-100'
                        }`}>
                          <MessageSquare className={`h-4 w-4 ${
                            activeSessionId === session.sessionId
                              ? 'text-white'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-medium truncate ${
                              activeSessionId === session.sessionId
                                ? 'text-primary-900'
                                : 'text-gray-900'
                            }`}>
                              {session.lastMessage.substring(0, 50)}
                              {session.lastMessage.length > 50 ? '...' : ''}
                            </p>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className={`text-xs ${
                                activeSessionId === session.sessionId
                                  ? 'text-primary-600'
                                  : 'text-gray-500'
                              }`}>
                                {session.messageCount}
                              </span>
                              <MessageSquare className={`h-3 w-3 ${
                                activeSessionId === session.sessionId
                                  ? 'text-primary-500'
                                  : 'text-gray-400'
                              }`} />
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
                            className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                            title="Delete conversation"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Lehar AI</p>
                  <p className="text-xs text-gray-500">Mental Health Companion</p>
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
