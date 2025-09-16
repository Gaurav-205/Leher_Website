import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, AlertTriangle, Menu } from 'lucide-react'
import { chatbotService } from '@services/chatbotService'
import toast from 'react-hot-toast'

interface Message {
  id: string
  text: string
  isFromUser: boolean
  timestamp: Date
  type?: 'text' | 'crisis' | 'suggestion'
  isCrisis?: boolean
}

interface ChatInterfaceProps {
  sessionId?: string | null
  onToggleSidebar?: () => void
}

const ChatInterface = ({ sessionId: propSessionId, onToggleSidebar }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Lehar, your AI mental health companion. How are you feeling today? I'm here to listen and provide support on your wellness journey.",
      isFromUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(propSessionId || null)
  const [isCrisisDetected, setIsCrisisDetected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load chat history when sessionId changes
  useEffect(() => {
    if (propSessionId && propSessionId !== sessionId) {
      loadChatHistory(propSessionId)
    } else if (!propSessionId && sessionId) {
      // Reset to new chat
      setMessages([{
        id: '1',
        text: "Hello! I'm Lehar, your AI mental health companion. How are you feeling today? I'm here to listen and provide support on your wellness journey.",
        isFromUser: false,
        timestamp: new Date(),
        type: 'text'
      }])
      setSessionId(null)
      setIsCrisisDetected(false)
    }
  }, [propSessionId, sessionId])

  const loadChatHistory = async (sessionIdToLoad: string) => {
    try {
      const response = await chatbotService.getChatHistory(sessionIdToLoad)
      const chatMessages: Message[] = (response.data?.messages || []).map((msg, index) => ({
        id: `${sessionIdToLoad}-${index}`,
        text: msg.content,
        isFromUser: msg.role === 'user',
        timestamp: new Date(msg.timestamp),
        type: msg.isCrisis ? 'crisis' : 'text',
        isCrisis: msg.isCrisis
      }))
      
      setMessages(chatMessages)
      setSessionId(sessionIdToLoad)
      
      // Check if any message is a crisis
      const hasCrisis = chatMessages.some(msg => msg.isCrisis)
      setIsCrisisDetected(hasCrisis)
      
      toast.success('Chat history loaded')
    } catch (error) {
      console.error('Error loading chat history:', error)
      toast.error('Failed to load chat history')
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isFromUser: true,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await chatbotService.sendMessage(currentMessage, sessionId)
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data?.message || '',
        isFromUser: false,
        timestamp: new Date(response.data?.timestamp || Date.now()),
        type: response.data?.isCrisis ? 'crisis' : 'text',
        isCrisis: Boolean(response.data?.isCrisis)
      }

      setMessages(prev => [...prev, aiResponse])
      
      // Update session ID if this is a new session
      if (response.data?.sessionId && !sessionId) {
        setSessionId(response.data.sessionId)
      }

      // Handle crisis detection
      if (response.data?.isCrisis) {
        setIsCrisisDetected(true)
        toast.error('Crisis detected - Please seek immediate professional help')
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team if the issue persists.",
        isFromUser: false,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const quickReplies = [
    "I'm feeling anxious",
    "I need help with stress",
    "I'm having trouble sleeping",
    "I feel overwhelmed",
    "I need someone to talk to"
  ]

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply)
  }

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Chat Header - Sticky at top */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center">
          {/* Sidebar Toggle Button */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="mr-3 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 lg:hidden"
              title="Open chat history"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Lehar AI Assistant</h2>
            <p className="text-primary-100 text-sm">Available 24/7 • Confidential Support</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>
        
        {/* Crisis Alert */}
        {isCrisisDetected && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-300 mr-2" />
              <div>
                <p className="text-red-100 font-medium">Crisis Support Available</p>
                <p className="text-red-200 text-sm">Emergency: 108 • KIRAN Helpline: 1800-599-0019</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area - Scrollable only */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar min-h-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isFromUser 
                    ? 'bg-primary-600' 
                    : 'bg-gray-100'
                }`}>
                  {message.isFromUser ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  message.isFromUser
                    ? 'bg-primary-600 text-white'
                    : message.isCrisis
                    ? 'bg-red-50 border border-red-200 text-red-900'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.isCrisis && !message.isFromUser && (
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs font-medium text-red-600">Crisis Response</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isFromUser 
                      ? 'text-primary-100' 
                      : message.isCrisis
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-3">Quick replies:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Sticky at bottom */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
