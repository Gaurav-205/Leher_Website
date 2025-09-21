import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, AlertTriangle, Menu, Heart, Sparkles, ArrowRight, Smile, Frown, Meh, Activity, Wind, Play, Pause, RotateCcw, MessageCircle, Lightbulb, Shield, Clock, Zap } from 'lucide-react'
import { chatbotService } from '@services/chatbotService'
import toast from 'react-hot-toast'
import { PromptSuggestion } from '@/components/ui/prompt-suggestion'

interface Message {
  id: string
  text: string
  isFromUser: boolean
  timestamp: Date
  type?: 'text' | 'crisis' | 'suggestion' | 'mood' | 'breathing' | 'tool'
  isCrisis?: boolean
  crisisSeverity?: 'low' | 'medium' | 'high' | 'critical'
  crisisConfidence?: number
  crisisKeywords?: string[]
  mood?: number
  toolData?: any
  isEncrypted?: boolean
  originalContent?: string
  decryptionError?: string
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
      text: "Hi there! I'm Leher, your AI wellness companion. I'm here to listen and support you. How can I help you today?",
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
  const [showPrompts, setShowPrompts] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const breathingIntervalRef = useRef<number | null>(null)

  // Simplified and more aesthetic prompt suggestions
  const suggestedPrompts = [
    "I'm feeling anxious",
    "Help with stress", 
    "Can't sleep well",
    "Feeling lonely",
    "Need motivation",
    "Want to talk",
    "Breathing exercises",
    "Feeling overwhelmed"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt)
    setShowPrompts(false)
    // Auto-send the prompt
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement
      if (form) {
        form.requestSubmit()
      }
    }, 100)
  }

  const handleNewMessage = () => {
    setShowPrompts(true)
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
        text: "Hi there! I'm Leher, your AI wellness companion. I'm here to listen and support you. How can I help you today?",
        isFromUser: false,
        timestamp: new Date(),
        type: 'text'
      }])
      setSessionId(null)
      setIsCrisisDetected(false)
      setShowPrompts(true)
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
        isCrisis: msg.isCrisis,
        crisisSeverity: msg.crisisSeverity,
        crisisConfidence: msg.crisisConfidence,
        crisisKeywords: msg.crisisKeywords,
        isEncrypted: msg.isEncrypted,
        originalContent: msg.originalContent,
        decryptionError: msg.decryptionError
      }))
      
      setMessages(chatMessages)
      setSessionId(sessionIdToLoad)
      
      // Check if any message is a crisis
      const hasCrisis = chatMessages.some(msg => msg.isCrisis)
      setIsCrisisDetected(hasCrisis)
      
      // Hide prompts if there are more than 2 messages
      setShowPrompts(chatMessages.length <= 2)
      
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
    setShowPrompts(false)

    try {
      const response = await chatbotService.sendMessage(currentMessage, sessionId)
      
      if (response.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data.message,
          isFromUser: false,
          timestamp: new Date(),
          type: response.data.isCrisis ? 'crisis' : 'text',
          isCrisis: response.data.isCrisis,
          crisisSeverity: response.data.crisisSeverity,
          crisisConfidence: response.data.crisisConfidence,
          crisisKeywords: response.data.crisisKeywords
        }
        
        setMessages(prev => [...prev, aiMessage])
        
        // Update session ID if this is a new session
        if (!sessionId && response.data.sessionId) {
          setSessionId(response.data.sessionId)
          onSessionChange?.(response.data.sessionId)
        }
        
        // Check for crisis detection with enhanced severity
        if (response.data.isCrisis) {
          setIsCrisisDetected(true)
          
          // Show different crisis alerts based on severity
          if (response.data.crisisSeverity === 'critical') {
            toast.error('Critical crisis detected - Immediate help needed!', {
              duration: 10000,
              icon: '🚨'
            })
          } else if (response.data.crisisSeverity === 'high') {
            toast.error('High-risk situation detected', {
              duration: 8000,
              icon: '⚠️'
            })
          }
        }
        
        // Show sensitive info warning if detected
        if (response.data.containsSensitiveInfo) {
          toast.success('Sensitive information detected and protected', {
            duration: 5000,
            icon: '🔒'
          })
        }
        
        // Show mood check after a few messages
        if (messages.length >= 3 && !showMoodCheck) {
          setTimeout(() => setShowMoodCheck(true), 1000)
        }
      } else {
        throw new Error(response.message || 'Failed to send message')
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or if this is an emergency, please call the helpline: 9152987821",
        isFromUser: false,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  // Breathing exercise functions (keeping existing functionality)
  const startBreathingExercise = () => {
    setShowBreathingTool(true)
    setBreathingActive(true)
    setBreathingPhase('inhale')
    setBreathingCount(0)
    
    let count = 0
    const phases = ['inhale', 'hold', 'exhale'] as const
    let phaseIndex = 0
    
    breathingIntervalRef.current = window.setInterval(() => {
      count++
      
      if (count % 4 === 0) {
        phaseIndex = (phaseIndex + 1) % phases.length
        setBreathingPhase(phases[phaseIndex])
      }
      
      if (count >= 12) {
        setBreathingCount(prev => prev + 1)
        count = 0
        phaseIndex = 0
        setBreathingPhase('inhale')
      }
    }, 1000)
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
      
      if (response.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data.message,
          isFromUser: false,
          timestamp: new Date(),
          type: response.data.isCrisis ? 'crisis' : 'text',
          isCrisis: response.data.isCrisis
        }
        
        setMessages(prev => [...prev, aiMessage])
        
        if (response.data.isCrisis) {
          setIsCrisisDetected(true)
        }
      } else {
        throw new Error(response.message || 'Failed to send message')
      }
    } catch (error: any) {
      console.error('Error sending quick reply:', error)
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
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
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#0F0F23]">
      {/* Minimalist Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100 dark:border-[#A8CFF1]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle Button */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="mr-3 p-2 hover:bg-gray-50 dark:hover:bg-[#1A1A2E]/50 rounded-lg transition-colors duration-200 lg:hidden"
                title="Open chat history"
              >
                <Menu className="h-5 w-5 text-gray-500 dark:text-[#B8B8B8]" />
              </button>
            )}
            
            {/* AI Assistant Info - Minimalist */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-[#2A3E66] to-[#00589F] dark:from-[#A8CFF1] dark:to-[#45A1E7] rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white dark:text-[#0F0F23]" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-[#A8CFF1] font-poppins">Leher AI</h2>
                <p className="text-sm text-gray-500 dark:text-[#B8B8B8] font-montserrat">Always here to help</p>
              </div>
            </div>
          </div>
          
          {/* Crisis Alert - Subtle */}
          {isCrisisDetected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 rounded-full"
            >
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-red-700 dark:text-red-400 font-montserrat">Crisis Support</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Messages Area - Clean and Spacious */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 min-h-0">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-3xl ${message.isFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Minimalist Avatar */}
              <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${
                message.isFromUser 
                  ? 'bg-gray-100' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600'
              }`}>
                {message.isFromUser ? (
                  <User className="h-3.5 w-3.5 text-gray-600" />
                ) : (
                  <Bot className="h-3.5 w-3.5 text-white" />
                )}
              </div>
              
              {/* Message Content - Clean Design */}
              <div className={`flex flex-col space-y-1 ${
                message.isFromUser ? 'items-end' : 'items-start'
              }`}>
                <div className={`px-4 py-3 rounded-2xl max-w-full ${
                  message.isFromUser
                    ? 'bg-[#2A3E66] dark:bg-[#00589F] text-white rounded-br-md'
                    : message.isCrisis
                    ? message.crisisSeverity === 'critical'
                      ? 'bg-red-100 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-200'
                      : message.crisisSeverity === 'high'
                      ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/50 text-orange-900 dark:text-orange-200'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/50 text-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-50 dark:bg-[#1A1A2E] text-gray-900 dark:text-[#A8CFF1]'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Crisis severity indicator */}
                  {message.isCrisis && message.crisisSeverity && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${
                        message.crisisSeverity === 'critical' ? 'bg-red-500 animate-pulse' :
                        message.crisisSeverity === 'high' ? 'bg-orange-500' :
                        message.crisisSeverity === 'medium' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <span className="text-xs font-medium capitalize text-[#2A3E66] dark:text-[#A8CFF1]">
                        {message.crisisSeverity} risk
                        {message.crisisConfidence && ` (${Math.round(message.crisisConfidence * 100)}% confidence)`}
                      </span>
                    </div>
                  )}
                  
                  {/* Encryption indicator */}
                  {message.isEncrypted && (
                    <div className="mt-2 flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Encrypted</span>
                    </div>
                  )}
                  
                  {/* Decryption error */}
                  {message.decryptionError && (
                    <div className="mt-2 flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-red-500">Decryption failed</span>
                    </div>
                  )}
                </div>
                
                {/* Subtle Timestamp */}
                <span className="text-xs text-gray-400 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Minimalist Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-3xl">
              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Prompt Suggestions */}
      <AnimatePresence>
        {showPrompts && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-shrink-0 px-6 py-6 border-t border-gray-100 bg-gray-50/50"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Quick starters</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <PromptSuggestion
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  >
                    {prompt}
                  </PromptSuggestion>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimalist Input Area */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isTyping ? "Leher is typing..." : "Type your message..."}
                disabled={isTyping}
                maxLength={1000}
                rows={1}
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none min-h-[48px] max-h-32"
                style={{ 
                  height: 'auto',
                  minHeight: '48px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px'
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {inputMessage.length > 800 && (
                <div className="absolute bottom-2 right-12 text-xs text-gray-400">
                  {inputMessage.length}/1000
                </div>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            title={isTyping ? "Please wait..." : "Send message"}
          >
            {isTyping ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
        
        {/* Subtle Help Text */}
        {messages.length > 1 && !isTyping && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <MessageCircle className="h-3 w-3" />
              <span>Press Enter to send</span>
            </div>
            <button
              onClick={handleNewMessage}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              New chat
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Crisis Support Modal */}
      {isCrisisDetected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Crisis Support</h3>
              <p className="text-gray-600 mb-6">
                Our AI has detected signs that you might be in distress. Please reach out to these helplines:
              </p>
              
              <div className="space-y-3">
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <p className="font-semibold text-red-800">Emergency</p>
                  <p className="text-red-700 text-lg font-mono">112</p>
                  <p className="text-xs text-red-600 mt-1">For immediate danger</p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <p className="font-semibold text-blue-800">KIRAN Helpline</p>
                  <p className="text-blue-700 text-lg font-mono">1800-599-0019</p>
                  <p className="text-xs text-blue-600 mt-1">24/7 mental health support</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <p className="font-semibold text-green-800">Suicide Prevention</p>
                  <p className="text-green-700 text-lg font-mono">9152987821</p>
                  <p className="text-xs text-green-600 mt-1">Crisis intervention</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-600">
                  <strong>Remember:</strong> You're not alone. These feelings are temporary, and help is available. 
                  Reach out to someone you trust or call one of these helplines.
                </p>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsCrisisDetected(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Continue Chat
                </button>
                <button
                  onClick={() => window.open('tel:112')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Call Emergency
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Minimalist Breathing Tool */}
      {showBreathingTool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Wind className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Breathing Exercise</h3>
              <p className="text-gray-600 mb-6">Follow the circle to breathe calmly</p>
              
              <div className="relative h-24 w-24 mx-auto mb-6">
                <div className={`h-full w-full rounded-full border-2 transition-all duration-1000 ${
                  breathingPhase === 'inhale' ? 'border-indigo-500 scale-110' :
                  breathingPhase === 'hold' ? 'border-green-500 scale-110' :
                  'border-purple-500 scale-100'
                }`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {breathingPhase}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 mb-6">
                <button
                  onClick={breathingActive ? stopBreathingExercise : startBreathingExercise}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2"
                >
                  {breathingActive ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setShowBreathingTool(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
              
              <p className="text-sm text-gray-500">
                Cycle {breathingCount + 1} • {breathingActive ? 'Active' : 'Paused'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default ChatInterface