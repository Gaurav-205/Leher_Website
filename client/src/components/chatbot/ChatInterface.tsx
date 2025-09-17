import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, AlertTriangle, Menu, Heart, Sparkles, ArrowRight, Smile, Frown, Meh, Activity, Wind, Play, Pause, RotateCcw } from 'lucide-react'
import { chatbotService } from '@services/chatbotService'
import toast from 'react-hot-toast'

interface Message {
  id: string
  text: string
  isFromUser: boolean
  timestamp: Date
  type?: 'text' | 'crisis' | 'suggestion' | 'mood' | 'breathing' | 'tool'
  isCrisis?: boolean
  mood?: number
  toolData?: any
}

interface ChatInterfaceProps {
  sessionId?: string | null
  onToggleSidebar?: () => void
  onSessionChange?: (sessionId: string | null) => void
}

const ChatInterface = ({ sessionId: propSessionId, onToggleSidebar, onSessionChange }: ChatInterfaceProps) => {
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
  const [showMoodCheck, setShowMoodCheck] = useState(false)
  const [showBreathingTool, setShowBreathingTool] = useState(false)
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathingCount, setBreathingCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null)

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
    if (!inputMessage.trim() || isTyping) return

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
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to get response')
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data?.message || 'I apologize, but I couldn\'t generate a response. Please try again.',
        isFromUser: false,
        timestamp: new Date(response.data?.timestamp || Date.now()),
        type: response.data?.isCrisis ? 'crisis' : 'text',
        isCrisis: Boolean(response.data?.isCrisis)
      }

      setMessages(prev => [...prev, aiResponse])
      
      // Update session ID if this is a new session
      if (response.data?.sessionId && !sessionId) {
        setSessionId(response.data.sessionId)
        // Notify parent component about the new session
        onSessionChange?.(response.data.sessionId)
      }

      // Handle crisis detection
      if (response.data?.isCrisis) {
        setIsCrisisDetected(true)
        toast.error('Crisis detected - Please seek immediate professional help')
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      
      // More specific error handling
      let errorMessage = "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team if the issue persists."
      
      if (error.response?.status === 401) {
        errorMessage = "Please log in again to continue the conversation."
        toast.error('Session expired. Please log in again.')
      } else if (error.response?.status === 429) {
        errorMessage = "I'm receiving too many requests. Please wait a moment and try again."
        toast.error('Too many requests. Please wait a moment.')
      } else if (error.response?.status >= 500) {
        errorMessage = "Our servers are experiencing issues. Please try again in a few minutes."
        toast.error('Server error. Please try again later.')
      } else {
        toast.error('Failed to send message. Please try again.')
      }
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
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

  // Mood tracking functions
  const handleMoodSelection = async (mood: number) => {
    const moodEmojis = ['😢', '😔', '😐', '🙂', '😊']
    const moodTexts = ['Very low', 'Low', 'Neutral', 'Good', 'Great']
    
    const moodMessage: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${moodTexts[mood - 1]} ${moodEmojis[mood - 1]}`,
      isFromUser: true,
      timestamp: new Date(),
      type: 'mood',
      mood: mood
    }

    setMessages(prev => [...prev, moodMessage])
    setShowMoodCheck(false)
    setIsTyping(true)

    try {
      // Track mood in backend
      await chatbotService.trackMood(mood, undefined, sessionId || undefined)
      
      // Send message to chatbot
      const response = await chatbotService.sendMessage(moodMessage.text, sessionId)
      
      if (response.success) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data?.message || 'Thank you for sharing how you feel. How can I support you today?',
          isFromUser: false,
          timestamp: new Date(response.data?.timestamp || Date.now()),
          type: response.data?.isCrisis ? 'crisis' : 'text',
          isCrisis: Boolean(response.data?.isCrisis)
        }
        setMessages(prev => [...prev, aiResponse])
      }
    } catch (error) {
      console.error('Error sending mood message:', error)
      toast.error('Failed to track mood. Please try again.')
    } finally {
      setIsTyping(false)
    }
  }

  // Breathing exercise functions
  const startBreathingExercise = () => {
    setShowBreathingTool(true)
    setBreathingActive(true)
    setBreathingPhase('inhale')
    setBreathingCount(0)
    
    const phases = ['inhale', 'hold', 'exhale'] as const
    let currentPhaseIndex = 0
    let count = 0
    
    breathingIntervalRef.current = setInterval(() => {
      setBreathingPhase(phases[currentPhaseIndex])
      
      if (phases[currentPhaseIndex] === 'exhale') {
        count++
        setBreathingCount(count)
      }
      
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
    }, 4000) // 4 seconds per phase
  }

  const stopBreathingExercise = () => {
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current)
      breathingIntervalRef.current = null
    }
    setBreathingActive(false)
    setShowBreathingTool(false)
    setBreathingCount(0)
  }

  // Cleanup breathing exercise on unmount
  useEffect(() => {
    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current)
      }
    }
  }, [])

  const handleQuickReply = async (reply: string) => {
    if (isTyping) return // Prevent multiple quick replies
    
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      isFromUser: true,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      const response = await chatbotService.sendMessage(reply, sessionId)
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to get response')
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data?.message || 'I apologize, but I couldn\'t generate a response. Please try again.',
        isFromUser: false,
        timestamp: new Date(response.data?.timestamp || Date.now()),
        type: response.data?.isCrisis ? 'crisis' : 'text',
        isCrisis: Boolean(response.data?.isCrisis)
      }

      setMessages(prev => [...prev, aiResponse])
      
      // Update session ID if this is a new session
      if (response.data?.sessionId && !sessionId) {
        setSessionId(response.data.sessionId)
        // Notify parent component about the new session
        onSessionChange?.(response.data.sessionId)
      }

      // Handle crisis detection
      if (response.data?.isCrisis) {
        setIsCrisisDetected(true)
        toast.error('Crisis detected - Please seek immediate professional help')
      }
    } catch (error: any) {
      console.error('Error sending quick reply:', error)
      
      // More specific error handling
      let errorMessage = "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team if the issue persists."
      
      if (error.response?.status === 401) {
        errorMessage = "Please log in again to continue the conversation."
        toast.error('Session expired. Please log in again.')
      } else if (error.response?.status === 429) {
        errorMessage = "I'm receiving too many requests. Please wait a moment and try again."
        toast.error('Too many requests. Please wait a moment.')
      } else if (error.response?.status >= 500) {
        errorMessage = "Our servers are experiencing issues. Please try again in a few minutes."
        toast.error('Server error. Please try again later.')
      } else {
        toast.error('Failed to send message. Please try again.')
      }
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        isFromUser: false,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Chat Header - Sticky at top */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          {/* Sidebar Toggle Button */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="mr-3 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300 lg:hidden"
              title="Open chat history"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-light text-gray-900">Lehar AI Assistant</h2>
            <p className="text-lg text-gray-600">Available 24/7</p>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            {/* Quick Action Buttons */}
            <button
              onClick={() => setShowMoodCheck(true)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Check your mood"
            >
              <Smile className="h-5 w-5 text-blue-600" />
            </button>
            <button
              onClick={startBreathingExercise}
              className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
              title="Start breathing exercise"
            >
              <Wind className="h-5 w-5 text-green-600" />
            </button>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Online</span>
            </div>
          </div>
        </div>
        
        {/* Crisis Alert */}
        {isCrisisDetected && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium mb-2">Crisis Support Available</p>
                <div className="text-red-600 text-sm space-y-1">
                  <p><strong>Emergency:</strong> 112 (All India Emergency)</p>
                  <p><strong>KIRAN Helpline:</strong> 1800-599-0019 (24/7 mental health support)</p>
                  <p><strong>Tele-MANAS:</strong> 14416 (National Tele Mental Health Program)</p>
                  <p><strong>National Suicide Prevention:</strong> 9152987821</p>
                </div>
                <p className="text-red-700 text-xs mt-2">
                  Please reach out to a trusted friend, family member, or professional immediately.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area - Scrollable only */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.isFromUser 
                  ? 'bg-blue-600' 
                  : 'bg-gray-100'
              }`}>
                {message.isFromUser ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <div className={`px-4 py-3 rounded-lg ${
                message.isFromUser
                  ? 'bg-blue-600 text-white'
                  : message.isCrisis
                  ? 'bg-red-50 border border-red-200 text-red-900'
                  : 'bg-gray-50 text-gray-900'
              }`}>
                {message.isCrisis && !message.isFromUser && (
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs font-medium text-red-600">Crisis Response</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isFromUser 
                    ? 'text-blue-100' 
                    : message.isCrisis
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Mood Check Modal */}
      <AnimatePresence>
        {showMoodCheck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMoodCheck(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How are you feeling?</h3>
                <p className="text-gray-600 mb-6">Select your current mood</p>
                
                <div className="flex justify-center space-x-4 mb-6">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => handleMoodSelection(mood)}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center text-2xl"
                    >
                      {mood === 1 && '😢'}
                      {mood === 2 && '😔'}
                      {mood === 3 && '😐'}
                      {mood === 4 && '🙂'}
                      {mood === 5 && '😊'}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Very Low</span>
                  <span>Great</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathingTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowBreathingTool(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Breathing Exercise</h3>
                <p className="text-gray-600">Follow the circle to breathe calmly</p>
              </div>
              
              <div className="relative mb-8">
                <div className={`w-48 h-48 mx-auto rounded-full border-4 transition-all duration-1000 ${
                  breathingPhase === 'inhale' 
                    ? 'bg-blue-100 border-blue-400 scale-110' 
                    : breathingPhase === 'hold'
                    ? 'bg-green-100 border-green-400 scale-105'
                    : 'bg-purple-100 border-purple-400 scale-100'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-700">
                      {breathingPhase === 'inhale' && 'Breathe In'}
                      {breathingPhase === 'hold' && 'Hold'}
                      {breathingPhase === 'exhale' && 'Breathe Out'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Cycle {Math.floor(breathingCount / 3) + 1}
                </p>
                <p className="text-sm text-gray-500">
                  {breathingPhase === 'inhale' && 'Inhale slowly for 4 seconds'}
                  {breathingPhase === 'hold' && 'Hold your breath for 4 seconds'}
                  {breathingPhase === 'exhale' && 'Exhale slowly for 4 seconds'}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={breathingActive ? stopBreathingExercise : startBreathingExercise}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  {breathingActive ? (
                    <>
                      <Pause className="h-5 w-5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span>Start</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowBreathingTool(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Replies - Show only when conversation is just starting (initial greeting) */}
      {messages.length === 1 && !messages.some(msg => msg.isFromUser) && (
        <div className="px-6 pb-4">
          <div className="flex items-center mb-3">
            <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
            <p className="text-sm font-medium text-gray-700">Quick replies:</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-4 py-2 text-sm bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 rounded-lg transition-colors duration-200"
              >
                {reply}
              </button>
            ))}
          </div>
          
          {/* Interactive Tools */}
          <div className="flex items-center mb-3">
            <Activity className="h-4 w-4 text-green-600 mr-2" />
            <p className="text-sm font-medium text-gray-700">Quick tools:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowMoodCheck(true)}
              className="px-4 py-2 text-sm bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Smile className="h-4 w-4" />
              <span>Check Mood</span>
            </button>
            <button
              onClick={startBreathingExercise}
              className="px-4 py-2 text-sm bg-white border border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Wind className="h-4 w-4" />
              <span>Breathing Exercise</span>
            </button>
            <button
              onClick={() => handleQuickReply("I need help with mindfulness")}
              className="px-4 py-2 text-sm bg-white border border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Heart className="h-4 w-4" />
              <span>Mindfulness Tips</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Area - Sticky at bottom */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isTyping ? "Lehar is typing..." : "Type your message..."}
              disabled={isTyping}
              maxLength={1000}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {inputMessage.length > 800 && (
              <div className="text-xs text-gray-500 mt-1 text-right">
                {inputMessage.length}/1000 characters
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            title={isTyping ? "Please wait..." : "Send message"}
          >
            {isTyping ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
