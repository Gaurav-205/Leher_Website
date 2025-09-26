import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

// Chatbot Components
import ChatInterface from '@components/chatbot/ChatInterface'
import ChatSidebar from '@components/chatbot/ChatSidebar'

const ChatbotPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#A8CFF1]/5 via-white to-[#B9A6DC]/5 dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E] relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#A8CFF1] to-[#B9A6DC] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-[#45A1E7] to-[#00589F] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#B9A6DC] to-[#A8CFF1] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 h-full flex">
        {/* Desktop Sidebar - Always visible on large screens */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <ChatSidebar
            isOpen={true}
            onClose={() => {}}
            onSessionSelect={setActiveSessionId}
            activeSessionId={activeSessionId}
          />
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-white/90 dark:bg-[#1A1A2E]/90 backdrop-blur-sm border border-[#A8CFF1]/20 dark:border-[#A8CFF1]/10 rounded-xl shadow-lg hover:bg-white dark:hover:bg-[#1A1A2E] hover:shadow-xl transition-all duration-300"
          title="Open chat sidebar"
        >
          <Menu className="h-5 w-5 text-[#2A3E66] dark:text-[#A8CFF1]" />
        </button>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <ChatSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSessionSelect={setActiveSessionId}
            activeSessionId={activeSessionId}
          />
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col min-w-0"
        >
          <ChatInterface 
            sessionId={activeSessionId} 
            onToggleSidebar={() => setSidebarOpen(true)}
            onSessionChange={setActiveSessionId}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ChatbotPage
