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
    <div className="h-full w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
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
          className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-300"
          title="Open chat sidebar"
        >
          <Menu className="h-5 w-5 text-gray-600" />
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
